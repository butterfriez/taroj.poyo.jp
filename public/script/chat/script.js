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
// Toggle sidebar visibility when hamburger menu is clicked
var hamburgerMenu = document.getElementById('hamburger-menu');
var sidebar = document.querySelector('.sidebar');
if (hamburgerMenu && sidebar) {
    hamburgerMenu.addEventListener('click', function () {
        sidebar.style.display =
            sidebar.style.display === 'none' ? 'block' : 'none';
    });
}
window.addEventListener('load', function () {
    var hamburger = document.querySelector('#hamburger-menu');
    var sidebar = document.querySelector('.sidebar');
    if (sidebar && window.innerWidth >= 720) {
        sidebar.style.display = 'block';
    }
    if (hamburger && window.innerWidth <= 720) {
        hamburger.style.display = 'block';
    }
});
function showNotification(title, body) {
    return __awaiter(this, void 0, void 0, function () {
        var permission, options, notification;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0: return [4 /*yield*/, Notification.requestPermission()];
                case 1:
                    permission = _a.sent();
                    if (permission === 'granted' && document.visibilityState === 'hidden') {
                        options = {
                            body: body,
                            icon: '../image/icon/icon.png',
                        };
                        notification = new Notification(title, options);
                    }
                    else {
                        localStorage.setItem('notificationPermission', permission);
                    }
                    return [2 /*return*/];
            }
        });
    });
}
messagesContainer.addEventListener('scroll', function () {
    var messagesContainer = document.getElementById('messages');
    if (messagesContainer) {
        var messages = messagesContainer.querySelectorAll('p');
        var lastVisibleMessage = null;
        for (var i = messages.length - 1; i >= 0; i--) {
            var message = messages[i];
            var rect = message.getBoundingClientRect();
            if (rect.bottom <= window.innerHeight) {
                lastVisibleMessage = message;
                break;
            }
        }
        if (lastVisibleMessage) {
            localStorage.setItem('scrollPos', lastVisibleMessage.id);
        }
    }
});
var adjustInputHeight = function () {
    var lines = inputField.value.split('\n').length;
    if (lines > 30) {
        lines = 30;
    }
    else if (lines <= 3) {
        lines = 3;
    }
    inputField.style.height = "".concat(lines, "ch");
};
window.addEventListener('DOMContentLoaded', function () { return __awaiter(_this, void 0, void 0, function () {
    var permission, input;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                permission = localStorage.getItem('notificationPermission');
                if (!(permission !== 'granted')) return [3 /*break*/, 2];
                return [4 /*yield*/, showNotification('', '')];
            case 1:
                _a.sent();
                _a.label = 2;
            case 2:
                input = localStorage.getItem('input');
                if (input) {
                    inputField.value = input;
                    adjustInputHeight();
                }
                return [2 /*return*/];
        }
    });
}); });
var addMessage = function (message) { return __awaiter(_this, void 0, void 0, function () {
    var messagesContainer, _i, message_1, item;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                console.log('Running addMessage() ', message);
                messagesContainer = document.getElementById('messages');
                console.log(messagesContainer);
                _i = 0, message_1 = message;
                _a.label = 1;
            case 1:
                if (!(_i < message_1.length)) return [3 /*break*/, 4];
                item = message_1[_i];
                console.log('Item: ', item);
                return [4 /*yield*/, formatMessage(item)];
            case 2:
                _a.sent();
                _a.label = 3;
            case 3:
                _i++;
                return [3 /*break*/, 1];
            case 4: return [2 /*return*/];
        }
    });
}); };
var formatMessage = function (message) { return __awaiter(_this, void 0, void 0, function () {
    var messageText, username, sent_on, format, formattedSentOn, isJapanese, formattedUsername, formattedMessageText, messagesContainer_1, pCount, formattedHtml, p, linkRegex, linkMatches, linkUrl, response, html, parser, doc, title, description, imageUrl, linkElement, preview, width, height, titleElement, maxLines, lineHeight, fontSize, maxHeight, descriptionElement, imageElement, error_1;
    var _a, _b, _c;
    return __generator(this, function (_d) {
        switch (_d.label) {
            case 0:
                _d.trys.push([0, 4, , 5]);
                console.log('Formatting: ', message);
                messageText = message.message;
                username = message.username;
                sent_on = message.sent_on;
                console.log(messageText);
                format = navigator.language === 'ja' ? 'ja-JP' : 'en-NZ';
                formattedSentOn = new Date(sent_on)
                    .toLocaleString(format, {
                    year: 'numeric',
                    month: 'long',
                    day: 'numeric',
                    hour: 'numeric',
                    minute: 'numeric',
                    second: 'numeric',
                    hour12: false,
                    timeZoneName: 'short',
                })
                    .replace(',', '.');
                isJapanese = format === 'ja-JP' && username === 'Anonymous';
                formattedUsername = isJapanese ? '名無し' : username;
                formattedMessageText = messageText.includes('>>')
                    ? messageText.replace(/>>(\d+)/g, '<a href="#$1" class="jump">>>$1</a>')
                    : messageText.replace(/(https?:\/\/[^\s]+)/g, '<a href="$1" target="_blank">$1</a>');
                messagesContainer_1 = document.getElementById('messages');
                pCount = messagesContainer_1.getElementsByTagName('p').length;
                formattedHtml = "".concat(pCount, " ").concat(formattedUsername, ": ").concat(formattedSentOn, "<br /><span style=\"padding-left: 2ch;\">").concat(formattedMessageText, "</span>");
                p = document.createElement('p');
                p.innerHTML = formattedHtml;
                p.id = pCount.toString();
                p.dataset.message = message.id;
                console.log(p);
                linkRegex = /(https?:\/\/[^\s]+)/g;
                linkMatches = messageText.match(linkRegex);
                if (!linkMatches) return [3 /*break*/, 3];
                linkUrl = linkMatches[0];
                return [4 /*yield*/, fetch(linkUrl)];
            case 1:
                response = _d.sent();
                return [4 /*yield*/, response.text()];
            case 2:
                html = _d.sent();
                parser = new DOMParser();
                doc = parser.parseFromString(html, 'text/html');
                title = (_a = doc
                    .querySelector('meta[property="og:title"]')) === null || _a === void 0 ? void 0 : _a.getAttribute('content');
                description = (_b = doc
                    .querySelector('meta[property="og:description"]')) === null || _b === void 0 ? void 0 : _b.getAttribute('content');
                imageUrl = (_c = doc
                    .querySelector('meta[property="og:image"]')) === null || _c === void 0 ? void 0 : _c.getAttribute('content');
                linkElement = document.createElement('a');
                linkElement.href = linkUrl;
                linkElement.target = '_blank';
                linkElement.classList.add('linkEmbed');
                preview = document.createElement('div');
                preview.classList.add('link-preview');
                width = Math.max(25, linkUrl.length * 0.6);
                height = Math.max(19, linkUrl.length * 0.3);
                preview.style.width = "".concat(width, "rem");
                preview.style.height = "".concat(height, "rem");
                titleElement = document.createElement('h3');
                titleElement.textContent = title || linkUrl;
                preview.appendChild(titleElement);
                maxLines = 3;
                lineHeight = 1.2;
                fontSize = 0.8;
                maxHeight = maxLines * lineHeight + 'rem';
                descriptionElement = document.createElement('p');
                descriptionElement.textContent = description || '';
                descriptionElement.style.maxHeight = maxHeight;
                descriptionElement.style.overflow = 'hidden';
                descriptionElement.style.fontSize = "".concat(fontSize, "em");
                preview.appendChild(descriptionElement);
                // Create and append the image element
                if (imageUrl) {
                    imageElement = document.createElement('img');
                    imageElement.src = imageUrl;
                    preview.appendChild(imageElement);
                }
                // Append the preview element to the link element
                linkElement.appendChild(preview);
                // Append the link element to the p element
                p.appendChild(linkElement);
                _d.label = 3;
            case 3:
                console.log(p);
                messagesContainer_1.appendChild(p);
                return [3 /*break*/, 5];
            case 4:
                error_1 = _d.sent();
                console.error('Error formatting message:', error_1);
                return [3 /*break*/, 5];
            case 5: return [2 /*return*/];
        }
    });
}); };
inputField.addEventListener('input', function () {
    localStorage.setItem('input', inputField.value);
    adjustInputHeight();
});
