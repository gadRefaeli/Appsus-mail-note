import { utilService } from './util-service.js'
import { storageService } from './storage-service.js'

export const MailService = {
  query
}

var STORAGE_KEY = 'mailDB';
var gMails;
_createMails()

function query() {
  var gMails = storageService.loadFromStorage(STORAGE_KEY)
  return Promise.resolve(gMails)
}

function _createMails() {
  var mails = storageService.loadFromStorage(STORAGE_KEY)
  if (!mails || mails.length === 0) {
    var mails = [
      _createMail('Learn Photoshop ', 'Join us to learn Photoshop from the master', false, 'Dribbble'),
    
    ];
  }

  gMails = mails;
  _saveMailsToStorage();

}

function _createMail(subject, body, isRead, sentAt) {
  var mail = {
    id: utilService.makeId(),
    subject,
    body,
    isRead,
    sentAt
  }
  return mail;
}

function _saveMailsToStorage() {
  storageService.saveToStorage(STORAGE_KEY, gMails);
}
