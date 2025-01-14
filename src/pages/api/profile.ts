import { NextApiHandler } from 'next';
import mysql from 'mysql';

const dbConfig = process.env.DATABASE_URL || '';

const profile_pictureHandler: NextApiHandler = async (req, res) => {
    if (req.method !== 'GET') {
        return res.status(405).json({ error: 'Method not allowed' });
    }

    const token = req.query.token;

    if (!token) {
        return res.status(401).json({ error: 'Unauthorized' });
    }

    const connection = mysql.createConnection(dbConfig);

    try {
        // Fetch the user ID from the user_tokens table using the token
        const selectUserIdQuery = 'SELECT user_id FROM user_tokens WHERE token = ?';
        connection.query(selectUserIdQuery, [token], (error: mysql.MysqlError | null, rows: any[]) => {
            if (error) {
                console.error('Error fetching user ID:', error);
                return res.status(500).json({ error: 'Internal server error' });
            } else {
                if (rows.length === 0) {
                    return res.status(404).json({ error: 'User not found' });
                }

                const userId = rows[0].user_id;
                console.log(userId);

                // Fetch the user data from the database using the retrieved user ID
                const selectUserQuery = 'SELECT username, email, profile_picture, verified FROM users WHERE id = ?';
                connection.query(selectUserQuery, [userId], (error: mysql.MysqlError | null, rows: any[]) => {
                    if (error) {
                        console.error('Error fetching user:', error);
                        return res.status(500).json({ error: 'Internal server error' });
                    } else {
                        if (rows.length === 0) {
                            return res.status(404).json({ error: 'User not found' });
                        }

                        const userData = rows[0];

                        const profileData = {
                            email: userData.email,
                            username: userData.username,
                            picture: userData.profile_picture,
                            verified: userData.verified
                        };

                        return res.status(200).json(profileData);
                    }
                });
            }
        });
    } catch (error) {
        console.error('Error fetching user ID:', error);
        return res.status(500).json({ error: 'Internal server error' });
    }
};

export default profile_pictureHandler;
