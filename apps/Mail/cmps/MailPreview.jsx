// const { Link } = ReactRouterDOM

export function MailPreview({ mail }) {
  return (
    <article className={'mail-preview '}>
     
      <p>subject - {mail.subject}</p>
      <p>body- {mail.body}</p>
     
      {/* <Link to={`/car/${car.id}/${car.vendor}`}>Details</Link> */}
    </article>
  )
}