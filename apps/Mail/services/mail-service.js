import { utilService } from './util-service.js'
import { storageService } from './services/storage-service.js'
export const MailService = {
  query,
  getMailById,
  removeMail,
  taggleReading,
  updateIfReading,
  addMail,
  getMailLengthByFilter,
  getNiceDate

}
var gSortingBy = 'subject';
var STORAGE_KEY = 'mailDB';
var gMails;

_createMails()

function query(filterBy, sortBy) {
  var gMails = storageService.loadFromStorage(STORAGE_KEY)
  if (!sortBy) return Promise.resolve(gMails)
  gSortingBy = sortBy;
  getMailesForDisplay()
  if (!filterBy) return Promise.resolve(gMails)
  var { search, read } = filterBy
  const filteredMails = gMails.filter(mail => {
    if (read !== null) {
      return (mail.body.includes(search) || mail.subject.includes(search)) &&
        mail.isRead == read
    }
    return mail.body.includes(search) || mail.subject.includes(search)
  })

  return Promise.resolve(filteredMails)
}



function getMailesForDisplay() {
  if (gSortingBy === 'subject') {
    
    gMails.sort(function (mail1, mail2) {
      if (mail1.subject.toLowerCase() > mail2.subject.toLowerCase()) return 1;
      if (mail2.subject.toLowerCase() > mail1.subject.toLowerCase()) return -1;
    });

  } else if (gSortingBy === 'date') {
   
    gMails.sort(function (mail1, mail2) {
      if (+mail1.sentAt > +mail2.sentAt) return 1;
      if (+mail2.sentAt > +mail1.sentAt) return -1;
    });
  }
  _saveMailsToStorage()
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
      _createMail('Learn Photoshop ', 'gad@gmail.com', 'Whether you’re an Adobe newbie or an industry veteran, Temi will show you how to work smarter, not harder, using Photoshop Well cover the basics, tips, and tricks to kickstart your Photoshop experience and what Temi wishes hed known when he first started. During the second half of Temis workshop he will show us how his approach to poster design merges graphic design and photography Plus, youll get to design a poster LIVE alongside Temi as you experience his process Youll also receive an exclusive PDF with Temis secret Photoshop shortcuts and tips after the workshop. Access to the recording will be included for two weeks after the workshop  We recommend you have Adobe Photoshop downloaded for these workshops', 'Dribbble@gmail.com'),
      _createMail('Learn Photoshop ', 'gad@gmail.com', 'Join us to learn Photoshop from the master', 'Gill@gmail.com'),
      _createMail('Learn Photoshop ', 'gad@gmail.com', 'Join us to learn Photoshop from the master', 'huji@gmail.com'),
      _createMail('Learn Photoshop ', 'gad@gmail.com', 'Join us to learn Photoshop from the master', 'Dribbble@gmail.com'),
      _createMail('Learn Photoshop ', 'gad@gmail.com', 'Join us to learn Photoshop from the master', 'Dribbble@gmail.com'),
    ];
  }

  gMails = mails;
  getMailesForDisplay()

}

function _createMail(subject, to, body, from) {
  let mail = {
    id: utilService.makeId(),
    subject,
    to,
    body,
    isRead: false,
    sentAt:new Date().getTime(),
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


function taggleReading(mailId) {
  var mailIdx = gMails.findIndex(mail => {
    return mailId === mail.id
  })
  gMails[mailIdx].isRead = !gMails[mailIdx].isRead;
  _saveMailsToStorage()
  return Promise.resolve()
}

function updateIfReading(mailId) {
  var mailIdx = gMails.findIndex(mail => {
    return mailId === mail.id
  })
  gMails[mailIdx].isRead = true;
  _saveMailsToStorage()
}


function addMail(mailToAdd) {
  var mail = _createMail(mailToAdd.subject, mailToAdd.to, mailToAdd.body, mailToAdd.from)
  gMails.unshift(mail)
  _saveMailsToStorage()
  return Promise.resolve(mail)
}


function getMailLengthByFilter(filter) {
  if (filter === null) return gMails.length;
  let length = 0;
  gMails.forEach(mail => {
    if (mail.isRead === filter) length++;
  });
  return length;
}
function getNiceDate(dateObj){
  var month = dateObj.getMonth() + 1; //months from 1-12
var day = dateObj.getDate();
var year = dateObj.getFullYear();

return newdate = year + "/" + month + "/" + day;
}