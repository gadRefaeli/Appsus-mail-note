const { Link } = ReactRouterDOM
import { MailPreview } from './MailPreview.jsx'
import { MailAdd } from '../pages/MailAdd.jsx'
export function MailList({ mails }) {
  return (
  <div>
   

     
 
  <div className="mail-list">
  <Link to="/MailApp/compose">compose</Link>
      { mails.map(mail => <MailPreview name={mail} key={mail.id}/>)}
    </div>
  </div>
  )
}