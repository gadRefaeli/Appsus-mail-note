import { utilService } from './util-service.js'
import { storageService } from './services/storage-service.js'
export const MailService = {
  query,
  getMailById,
  removeMail,
  taggleReading,
  updateIfReading,
  addMail
}

var STORAGE_KEY = 'mailDB';
var gMails;
_createMails()

function query() {
  var gMails = storageService.loadFromStorage(STORAGE_KEY)
  return Promise.resolve(gMails)
}


function getMailById(mailId) {
  var mail = gMails.find(function (mail) {
    return mailId === mail.id
  })
  return Promise.resolve(mail)
}


function _createMails() {
  var mails = storageService.loadFromStorage(STORAGE_KEY)
  if (!mails || mails.length === 0) {
    var mails = [
      _createMail('Learn Photoshop ', 'gad@gmail.com', 'Whether you’re an Adobe newbie or an industry veteran, Temi will show you how to work smarter, not harder, using Photoshop Well cover the basics, tips, and tricks to kickstart your Photoshop experience and what Temi wishes hed known when he first started. During the second half of Temis workshop he will show us how his approach to poster design merges graphic design and photography Plus, youll get to design a poster LIVE alongside Temi as you experience his process Youll also receive an exclusive PDF with Temis secret Photoshop shortcuts and tips after the workshop. Access to the recording will be included for two weeks after the workshop  We recommend you have Adobe Photoshop downloaded for these workshops', false, 'Dribbble@gmail.com'),
      _createMail('Learn Photoshop ', 'gad@gmail.com', 'Join us to learn Photoshop from the master', false, 'Dribbble@gmail.com'),
      _createMail('Learn Photoshop ', 'gad@gmail.com', 'Join us to learn Photoshop from the master', false, 'Dribbble@gmail.com'),
      _createMail('Learn Photoshop ', 'gad@gmail.com', 'Join us to learn Photoshop from the master', false, 'Dribbble@gmail.com'),
      _createMail('Learn Photoshop ', 'gad@gmail.com', 'Join us to learn Photoshop from the master', false, 'Dribbble@gmail.com'),
    ];
  }

  gMails = mails;
  _saveMailsToStorage();

}

function _createMail(subject, to, body, isRead, from) {
  let mail = {
    id: utilService.makeId(),
    subject,
    to,
    body,
    isRead,
    sentAt: new Date().getTime(),
    from

  }
  return mail;
}

function _saveMailsToStorage() {
  storageService.saveToStorage(STORAGE_KEY, gMails);
}


function removeMail(mailId) {
  var mailIdx = gMails.findIndex(mail => {
    return mailId === mail.id
  })
  gMails.splice(mailIdx, 1)
  _saveMailsToStorage();
  return Promise.resolve()
}


function taggleReading(mailId){
  var mailIdx = gMails.findIndex(mail => {
    return mailId === mail.id
  })
  gMails[mailIdx].isRead=!gMails[mailIdx].isRead;
  _saveMailsToStorage()
  return Promise.resolve()
}

function updateIfReading(mailId){
  var mailIdx = gMails.findIndex(mail => {
    return mailId === mail.id
  })
  gMails[mailIdx].isRead=true;
  _saveMailsToStorage()
}


function addMail(mailToAdd) {
  var mail = _createMail(mailToAdd.subject, mailToAdd.to, mailToAdd.body, mailToAdd.isRead, mailToAdd.from)
  gMails.unshift(mail)
  _saveMailsToStorage()
  return Promise.resolve(mail)
}
