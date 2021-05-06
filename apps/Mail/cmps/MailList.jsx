const { Link } = ReactRouterDOM
import { MailPreview } from './MailPreview.jsx'
import { MailAdd } from '../pages/MailAdd.jsx'
export function MailList({ mails, removePreviewedMail, taggleIsReading,taggleIsStared})  {
  return (
  <div>
   
  <div className="mail-list">
      { mails.map(mail => <MailPreview name={mail} key={mail.id} removePreviewedMail={removePreviewedMail} taggleIsReading={taggleIsReading} taggleIsStared={taggleIsStared} />)}
    </div>
  </div>
  )
}