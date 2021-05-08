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
  getNiceDate,
  taggleStar

}
var gSortingBy = 'date';
var STORAGE_KEY = 'mailDB';
var gMails;

_createMails()

function query(filterBy, sortBy) {
  var gMails = storageService.loadFromStorage(STORAGE_KEY)
  if (!sortBy) return Promise.resolve(gMails)

  if (!filterBy) return Promise.resolve(gMails)
  var { search, read, star } = filterBy
  const filteredMails = gMails.filter(mail => {
    if(star) return mail.isStar === true
    if (read !== null) {
      return (mail.body.includes(search) || mail.subject.includes(search)||mail.from.includes(search)) &&
        mail.isRead === read
    }
    return mail.body.includes(search) || mail.subject.includes(search)
  })

  return Promise.resolve(filteredMails)
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
      _createMail('Learn Photoshop', 'Me@gmail.com', 'Whether you’re an Adobe newbie or an industry veteran, Temi will show you how to work smarter, not harder, using Photoshop Well cover the basics, tips, and tricks to kickstart your Photoshop experience and what Temi wishes hed known when he first started. During the second half of Temis workshop he will show us how his approach to poster design merges graphic design and photography Plus, youll get to design a poster LIVE alongside Temi as you experience his process Youll also receive an exclusive PDF with Temis secret Photoshop shortcuts and tips after the workshop. Access to the recording will be included for two weeks after the workshop  We recommend you have Adobe Photoshop downloaded for these workshops', 'Dribbble@gmail.com'),
      _createMail('Food and Health', 'Me@gmail.com', 'Theyre finally here! Our three newest food courses on Coursera just launched and youre warmly invited to sign up and join me: 1. Rebuilding our Relationship with Food 2. Introduction to Food and Our Environment 3. Cooking for Busy, Healthy People Looking to redefine the role of food in your life and help protect our planet? These courses can be taken as part of the Stanford Specialization in Food Sustainability, Mindful Eating and Healthy Cooking  Food is one of the greatest joys in life, but our eating environment and the way in which food is produced has become a source of stress for our planet and the many wonderful people who live on it. Lets start fixing that together - one delicious meal at a time. Join me on a gentle, easy-to-digest journey. Warm wishes and hope to see you in class soon. Maya Adam MD', 'coursera@.mail.org'),
      _createMail('Save the Date!', 'Me@gmail.com', 'Explore our latest products & solutions, view product demo videos, and more! The first 150 booth visitors who click on the "Golden Photon Food Box" are eligible to receive a FREE GIFT*! ($10 value) Dont miss out.', 'marcom@mksinst.com'),
      _createMail('Speakers Announced', 'Me@gmail.com', 'Confirmed speakers from ADVA, China Mobile, Deutsche Telekom, Ericsson, ETSI-F5G, Futurewei, Lumentum, MobileEdgeX, NTT, NTT Docomo, Orange Labs, Rakuten Mobile, Telecom Italia, Qualcomm, VaporIO, Verizon, and II-VI.', 'osa@osacom.org'),
      _createMail('Thanks for your order!', 'Me@gmail.com', 'Hi there, We recently announced several new features as part of the Figma platform. We have updated our Terms of Service and Privacy Policy to support these enhancements, better explain our services, and outline what we ask of our customers. Below are some of the key changes:Terms of Service:Removed language that was specific to Figma design Updated our dispute resolution procedure to reflect standard practice Added a separate and more comprehensive community section Made significant edits for clarity and readability Privacy Policy.', 'support@figma.com'),
      _createMail('Learn Photoshop', 'Me@gmail.com', 'Whether you’re an Adobe newbie or an industry veteran, Temi will show you how to work smarter, not harder, using Photoshop Well cover the basics, tips, and tricks to kickstart your Photoshop experience and what Temi wishes hed known when he first started. During the second half of Temis workshop he will show us how his approach to poster design merges graphic design and photography Plus, youll get to design a poster LIVE alongside Temi as you experience his process Youll also receive an exclusive PDF with Temis secret Photoshop shortcuts and tips after the workshop. Access to the recording will be included for two weeks after the workshop  We recommend you have Adobe Photoshop downloaded for these workshops', 'Dribbble@gmail.com'),
      _createMail('Food and Health', 'Me@gmail.com', 'Theyre finally here! Our three newest food courses on Coursera just launched and youre warmly invited to sign up and join me: 1. Rebuilding our Relationship with Food 2. Introduction to Food and Our Environment 3. Cooking for Busy, Healthy People Looking to redefine the role of food in your life and help protect our planet? These courses can be taken as part of the Stanford Specialization in Food Sustainability, Mindful Eating and Healthy Cooking  Food is one of the greatest joys in life, but our eating environment and the way in which food is produced has become a source of stress for our planet and the many wonderful people who live on it. Lets start fixing that together - one delicious meal at a time. Join me on a gentle, easy-to-digest journey. Warm wishes and hope to see you in class soon. Maya Adam MD', 'coursera@.mail.org'),
      _createMail('Save the Date!', 'Me@gmail.com', 'Explore our latest products & solutions, view product demo videos, and more! The first 150 booth visitors who click on the "Golden Photon Food Box" are eligible to receive a FREE GIFT*! ($10 value) Dont miss out.', 'marcom@mksinst.com'),
      _createMail('Speakers Announced', 'Me@gmail.com', 'Confirmed speakers from ADVA, China Mobile, Deutsche Telekom, Ericsson, ETSI-F5G, Futurewei, Lumentum, MobileEdgeX, NTT, NTT Docomo, Orange Labs, Rakuten Mobile, Telecom Italia, Qualcomm, VaporIO, Verizon, and II-VI.', 'osa@osacom.org'),
      _createMail('Thanks for your order!', 'Me@gmail.com', 'Hi there, We recently announced several new features as part of the Figma platform. We have updated our Terms of Service and Privacy Policy to support these enhancements, better explain our services, and outline what we ask of our customers. Below are some of the key changes:Terms of Service:Removed language that was specific to Figma design Updated our dispute resolution procedure to reflect standard practice Added a separate and more comprehensive community section Made significant edits for clarity and readability Privacy Policy.', 'support@figma.com'),
    
    ];
  }

  gMails = mails;
  _saveMailsToStorage()

}

function _createMail(subject, to, body, from) {
  let mail = {
    id: utilService.makeId(),
    subject,
    to,
    body,
    isRead: false,
    sentAt: new Date().getTime(),
    from,
    isStar: false
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

function taggleStar(mailId) {
  var mailIdx = gMails.findIndex(mail => {
    return mailId === mail.id
  })
  gMails[mailIdx].isStar = !gMails[mailIdx].isStar;
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
function getNiceDate(dateObj) {
  var month = dateObj.getMonth() + 1; //months from 1-12
  var day = dateObj.getDate();
  var year = dateObj.getFullYear();

  return newdate = year + "/" + month + "/" + day;
}