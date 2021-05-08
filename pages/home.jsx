const Router = ReactRouterDOM.HashRouter
const { Link } = ReactRouterDOM


export class Home extends React.Component {
    render() {
        return (
            <div className="home-sec">
                <div className="main-txt">
                    <h1> Welcome to our email-notes app!</h1>
                    <p>This is a convenient app that combines two apps together.
                    Manage emails and save messages in a synchronized and user-friendly way!
                    In this app you will find everything you need to manage your agenda at work at home and everywhere.
                    You can enjoy uncompromising user friendliness with adaptability to all types of devices.</p>
                    <button className="btn-header"><Link to="/MailApp">MisterEmail</Link></button>
                    <button className="btn-header"><Link to="/KeepApp">MissKeep</Link></button>
                </div>
                <div className="mockup"><img src="./img/new1-01.png"></img> </div>

            </div>
        )
    }
}