var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (g && (g = 0, op[0] && (_ = 0)), _) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
var _this = this;
// Send a new message to the server
var inputField = document.getElementById('input-field');
var messagesContainer = document.getElementById('messages');
var inputContainer = document.getElementById('input-container');
// Toggle sidebar visibility when hamburger menu is clicked
var hamburgerMenu = document.getElementById('hamburger-menu');
var sidebar = document.querySelector('.sidebar');
if (hamburgerMenu && sidebar) {
    hamburgerMenu.addEventListener('click', function () {
        sidebar.style.display =
            sidebar.style.display === 'none' ? 'flex' : 'none';
    });
}
var showNotification = function (title, body) { return __awaiter(_this, void 0, void 0, function () {
    var registration, permission, options, error_1;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                console.log('Running showNotification() ', title, body);
                if (!('serviceWorker' in navigator)) return [3 /*break*/, 7];
                _a.label = 1;
            case 1:
                _a.trys.push([1, 6, , 7]);
                return [4 /*yield*/, navigator.serviceWorker.ready];
            case 2:
                registration = _a.sent();
                if (!('showNotification' in registration)) return [3 /*break*/, 5];
                return [4 /*yield*/, Notification.requestPermission()];
            case 3:
                permission = _a.sent();
                if (!(permission === 'granted')) return [3 /*break*/, 5];
                options = {
                    body: body,
                    icon: '../image/icon/icon.png',
                    data: {},
                };
                return [4 /*yield*/, registration.showNotification(title, options)];
            case 4:
                _a.sent();
                _a.label = 5;
            case 5: return [3 /*break*/, 7];
            case 6:
                error_1 = _a.sent();
                console.error('Error accessing service worker:', error_1);
                return [3 /*break*/, 7];
            case 7: return [2 /*return*/];
        }
    });
}); };
var adjustInputHeight = function () {
    var lines = inputField.value.split('\n').length;
    if (lines > 30) {
        lines = 30;
    }
    else if (lines <= 3) {
        lines = 3;
    }
    var scrollableHeight = messagesContainer.scrollHeight - messagesContainer.clientHeight;
    var isScrolledToBottom = Math.abs(messagesContainer.scrollTop - scrollableHeight) <= 1;
    inputField.style.height = "".concat(lines, "ch");
    adjustMessagesHeight(isScrolledToBottom);
};
var adjustMessagesHeight = function (isScrolledToBottom) {
    var inputHeight = window.getComputedStyle(inputContainer).height;
    var inputHeightInCh = parseFloat(inputHeight) /
        parseFloat(getComputedStyle(document.documentElement).fontSize);
    console.log('Input height: ', inputHeightInCh);
    var paddingBottom = "".concat(inputHeightInCh, "ch");
    //messagesContainer.style.paddingBottom = paddingBottom;
    console.log(isScrolledToBottom, messagesContainer.scrollTop);
    if (isScrolledToBottom) {
        messagesContainer.scrollTop = messagesContainer.scrollHeight;
    }
};
window.addEventListener('DOMContentLoaded', function () { return __awaiter(_this, void 0, void 0, function () {
    var input;
    return __generator(this, function (_a) {
        input = localStorage.getItem('input');
        if (input) {
            inputField.value = input;
            adjustInputHeight();
        }
        return [2 /*return*/];
    });
}); });
var addMessage = function (message) { return __awaiter(_this, void 0, void 0, function () {
    var messagesContainer, _i, message_1, item, isAtBottom;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                console.log('Running addMessage() ', message);
                messagesContainer = document.getElementById('messages');
                console.log(messagesContainer);
                if (!Array.isArray(message)) return [3 /*break*/, 5];
                _i = 0, message_1 = message;
                _a.label = 1;
            case 1:
                if (!(_i < message_1.length)) return [3 /*break*/, 4];
                item = message_1[_i];
                console.log('Item: ', item);
                return [4 /*yield*/, formatMessage(item)];
            case 2:
                _a.sent();
                isAtBottom = messagesContainer.scrollTop + messagesContainer.clientHeight ===
                    messagesContainer.scrollHeight;
                if (isAtBottom) {
                    messagesContainer.scrollTop = messagesContainer.scrollHeight;
                }
                _a.label = 3;
            case 3:
                _i++;
                return [3 /*break*/, 1];
            case 4: return [3 /*break*/, 7];
            case 5:
                console.log('Item: ', message);
                return [4 /*yield*/, formatMessage(message)];
            case 6:
                _a.sent();
                _a.label = 7;
            case 7: return [2 /*return*/];
        }
    });
}); };
var formatMessage = function (message) { return __awaiter(_this, void 0, void 0, function () {
    var messageString, username, sent_on, messageText, format, options, formatter, formattedSentOn, isJapanese, formattedUsername, formattedMessageText, messagesContainer_1, pCount, formattedHtml, p, linkRegex, linkMatches, linkUrl, imageRegex, isImage, imageElement, response, html, parser, doc, meta_title, meta_description, meta_image, title, description, imageUrl, linkElement, preview, width, height, messagesWidth, previewWidth, titleElement, fontSize, descriptionElement, imageElement, messagesWidth_1, imageWidth, error_2, error_3;
    var _a, _b;
    return __generator(this, function (_c) {
        switch (_c.label) {
            case 0:
                _c.trys.push([0, 9, , 10]);
                console.log('Formatting: ', message);
                messageString = message.message;
                username = message.username;
                sent_on = message.sent_on;
                return [4 /*yield*/, wrapCodeInTags(messageString)];
            case 1:
                messageText = _c.sent();
                console.log(messageText);
                format = navigator.language === 'ja' ? 'ja-JP' : 'en-NZ';
                options = {
                    year: 'numeric',
                    month: 'long',
                    day: 'numeric',
                    hour: 'numeric',
                    minute: 'numeric',
                    second: 'numeric',
                    hour12: false,
                };
                formatter = new Intl.DateTimeFormat(format, options);
                formattedSentOn = formatter
                    .format(new Date(sent_on))
                    .replace(',', '.');
                isJapanese = format === 'ja-JP' && username === 'Anonymous';
                formattedUsername = isJapanese ? '名無し' : username;
                formattedMessageText = messageText.replace(/((?:>>\d+)|(?:https?:\/\/[^\s]+))/g, function (match) {
                    if (match.startsWith('>>')) {
                        return "<a href=\"#".concat(match.slice(2), "\" class=\"jump\">").concat(match, "</a>");
                    }
                    else {
                        return "<a href=\"".concat(match, "\" target=\"_blank\">").concat(match, "</a>");
                    }
                });
                messagesContainer_1 = document.getElementById('messages');
                pCount = messagesContainer_1.getElementsByTagName('p').length + 1;
                if (formattedMessageText && formattedMessageText.includes('\\')) {
                    formattedMessageText = formattedMessageText.replace(/\\/g, '');
                }
                formattedHtml = "".concat(pCount, " ").concat(formattedUsername, ": ").concat(formattedSentOn, "<br /><pre class=\"messageText\">").concat(formattedMessageText, "</pre>");
                p = document.createElement('p');
                p.innerHTML = formattedHtml;
                p.id = pCount.toString();
                p.dataset.server = message.id;
                console.log(p);
                _c.label = 2;
            case 2:
                _c.trys.push([2, 7, , 8]);
                linkRegex = /(https?:\/\/[^\s]+)/g;
                linkMatches = messageText.match(linkRegex);
                if (!linkMatches) return [3 /*break*/, 6];
                linkUrl = linkMatches[0];
                imageRegex = /\.(gif|jpe?g|png)(\?.*)?$/i;
                isImage = imageRegex.test(linkUrl);
                if (!isImage) return [3 /*break*/, 3];
                imageElement = document.createElement('img');
                imageElement.src = linkUrl;
                imageElement.classList.add('linkImage');
                // Append image element to p element
                p.appendChild(imageElement);
                return [3 /*break*/, 6];
            case 3: return [4 /*yield*/, fetch(linkUrl)];
            case 4:
                response = _c.sent();
                return [4 /*yield*/, response.text()];
            case 5:
                html = _c.sent();
                parser = new DOMParser();
                doc = parser.parseFromString(html, 'text/html');
                meta_title = doc.querySelector('meta[property="og:title"]');
                meta_description = doc.querySelector('meta[property="og:description"]');
                meta_image = doc.querySelector('meta[property="og:image"]');
                title = void 0, description = void 0, imageUrl = void 0;
                if (meta_title) {
                    title = meta_title.getAttribute('content');
                }
                else {
                    title = (_a = doc
                        .querySelector('meta[name="description"]')) === null || _a === void 0 ? void 0 : _a.getAttribute('content');
                }
                if (meta_description) {
                    description = meta_description.getAttribute('content');
                }
                else {
                    description = (_b = doc
                        .querySelector('meta[name="description"]')) === null || _b === void 0 ? void 0 : _b.getAttribute('content');
                }
                if (meta_image) {
                    imageUrl = meta_image.getAttribute('content');
                }
                else {
                    imageUrl = '';
                }
                linkElement = document.createElement('a');
                linkElement.href = linkUrl;
                linkElement.target = '_blank';
                linkElement.classList.add('linkEmbed');
                preview = document.createElement('div');
                preview.classList.add('link-preview');
                width = Math.max(25, linkUrl.length * 0.6);
                height = Math.max(23, linkUrl.length * 0.3);
                preview.style.width = "".concat(width, "rem");
                preview.style.height = "".concat(height, "rem");
                messagesWidth = messagesContainer_1.offsetWidth;
                previewWidth = preview.offsetWidth;
                if (previewWidth < messagesWidth) {
                    preview.style.width = "".concat(messagesWidth * 0.9, "px");
                }
                titleElement = document.createElement('h3');
                titleElement.textContent = title || linkUrl;
                preview.appendChild(titleElement);
                fontSize = 0.8;
                descriptionElement = document.createElement('p');
                descriptionElement.textContent = description || '';
                descriptionElement.style.overflow = 'hidden';
                descriptionElement.style.fontSize = "".concat(fontSize, "em");
                /* Split the text content of the description element by line breaks and count the number of lines
                const lineHeight = parseFloat(
                    getComputedStyle(descriptionElement).lineHeight
                );*/
                // Calculate the line height and maximum height of the description element
                //descriptionElement.style.lineHeight = lineHeight + 'px';
                preview.appendChild(descriptionElement);
                console.log(imageUrl);
                // Create and append the image element
                if (imageUrl) {
                    imageElement = document.createElement('img');
                    imageElement.src = imageUrl;
                    imageElement.classList.add('previewImage');
                    messagesWidth_1 = messagesContainer_1.offsetWidth;
                    imageWidth = imageElement.offsetWidth;
                    if (imageWidth < messagesWidth_1) {
                        imageElement.style.width = "".concat(messagesWidth_1 * 0.9, "px");
                    }
                    preview.appendChild(imageElement);
                }
                else {
                    preview.classList.add('noIMG');
                }
                // Append the preview element to the link element
                linkElement.appendChild(preview);
                // Append the link element to the p element
                p.appendChild(linkElement);
                _c.label = 6;
            case 6: return [3 /*break*/, 8];
            case 7:
                error_2 = _c.sent();
                console.error('Error parsing link:', error_2);
                return [3 /*break*/, 8];
            case 8:
                console.log(p);
                messagesContainer_1.appendChild(p);
                return [3 /*break*/, 10];
            case 9:
                error_3 = _c.sent();
                console.error('Error formatting message:', error_3);
                return [3 /*break*/, 10];
            case 10: return [2 /*return*/];
        }
    });
}); };
function wrapCodeInTags(text) {
    return __awaiter(this, void 0, void 0, function () {
        var codeRegex, match, lang, codeContent, wrappedCode;
        return __generator(this, function (_a) {
            codeRegex = /```(\w*)([\s\S]*?)```/;
            match = text.match(codeRegex);
            if (match) {
                lang = match[1];
                codeContent = match[2];
                wrappedCode = "<code".concat(lang === 'aa' ? ' class="textar-aa"' : " lang=\"".concat(lang, "\""), ">").concat(codeContent, "</code>");
                return [2 /*return*/, text.replace(codeRegex, wrappedCode)];
            }
            return [2 /*return*/, text];
        });
    });
}
var deleteMessage = function (messageId) {
    fetch('/api/chat', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({
            method: 'deleteMessage',
            message_id: messageId,
            server_id: 'WzB5nAz5Q_LTzv7YOZmyZrka6sCyS2',
        }),
    })
        .then(function (response) {
        console.log(response); // log the response
        var messageElement = document.getElementById(messageId.toString());
        if (messageElement) {
            messageElement.remove();
        }
    })
        .catch(function (error) {
        console.error('Error deleting message:', error);
    });
};
inputField.addEventListener('input', function () {
    localStorage.setItem('input', inputField.value);
    adjustInputHeight();
});
