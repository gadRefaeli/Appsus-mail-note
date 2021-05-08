const { Link } = ReactRouterDOM
import { MailService } from '../services/mail-service.js'
import { MailList } from '../cmps/MailList.jsx'
import { MailFilter } from '../cmps/MailFilter.jsx'
import { MailSearch } from '../cmps/MailSearch.jsx'

import { eventBusService } from '../services/event-bus-service.js'


export class MailApp extends React.Component {

   
    removeEvent;
    state = {
        mails: null,
        filterBy: {
            search: '',
            read: null,
            star: false
        },
        sortBy: 'date',
        allMailCount: null,
        readMailCount: null,
        unreadMailCount: null,
        sideBar:false
    }

    getMailCount=()=>{
        this.setState({ readMailCount: MailService.getMailLengthByFilter(true) },eventBusService.emit('mail-read-count', this.state.readMailCount))
        this.setState({ unreadMailCount: MailService.getMailLengthByFilter(false) },eventBusService.emit('mail-unread-count', this.state.unreadMailCount))  
       
    }


    componentDidMount() {
        this.loadMails();
        this.getMailCount() 
    }


    loadMails() {

        MailService.query(this.state.filterBy, this.state.sortBy)
            .then((mails) => {
                this.setState({ mails })
                this.getMailCount()
                
            })
            
    }
    sort(sortingBy) {
        var mails=this.state.mails;
        if (sortingBy === 'subject') {
          
            mails.sort(function (mail1, mail2) {
            if (mail1.subject.toLowerCase() > mail2.subject.toLowerCase()) return 1;
            if (mail2.subject.toLowerCase() > mail1.subject.toLowerCase()) return -1;
          });
      
        } else if (sortingBy === 'date') {
         
            mails.sort(function (mail1, mail2) {
            if (+mail1.sentAt > +mail2.sentAt) return 1;
            if (+mail2.sentAt > +mail1.sentAt) return -1;
          });
        }
      }
    onSetFilter = (filterBy) => {
        this.setState({ filterBy: { ...this.state.filterBy, ...filterBy } }, this.loadMails())
    }

    removePreviewedMail= (id) =>{
        MailService.removeMail(id)
        this.getMailCount()
      }
    
    
      taggleIsReading = (id) =>{
        MailService.taggleReading(id)
        this.getMailCount()
      }
      taggleIsStared = (id) =>{
        MailService.taggleStar(id)
      }
      taggleSideBar=()=>{
        this.setState({sideBar: !this.state.sideBar})
        
      }
      render() {
     var sideBarClass=(this.state.sideBar)? 'mail-side-bar-open':'mail-side-bar-close';
        // const readPrec=`${100*this.state.unreadMailCount/(this.state.unreadMailCount+this.state.readMailCount)}%`;
        const { mails } = this.state
        if (!mails) return <div>Loading...</div>
        var unreadPercentage=100*(this.state.unreadMailCount/(this.state.unreadMailCount+this.state.readMailCount));
        const divStyle={ width: `${unreadPercentage}%`}
        return (
            <section className="Mail-list-section">
                   <div className="mail-side-bar">
                <h1>Mailbox</h1> 
                
                <div>
                <Link to="/MailApp/compose"><button className="compose-btn"><img src="./img/compose-01.png" width="30"></img><span>Compose</span>  </button> </Link>
                    <MailFilter onSetFilter={this.onSetFilter} getMailCount={this.getMailCount}/>
                    <p> Unread Mails: ({this.state.unreadMailCount})/( {this.state.unreadMailCount+this.state.readMailCount})</p>
                    <div className="bar-unread"> <div className="bar-unread-inner" style={divStyle}></div></div>
                    </div> 
                    </div>
               <div></div>
                 <div className="mail-side-bar-nav">
                <h1>Mailbox <span className={sideBarClass} onClick={this.taggleSideBar}><img src="./img/compose-02.png" width="30"></img> </span></h1> 
                

                


                {(this.state.sideBar)&&
                <div className="side-bar-phone">
                <Link to="/MailApp/compose"><button className="compose-btn"><img src="./img/compose-01.png" width="30"></img><span>Compose</span>  </button> </Link>
                    <MailFilter onSetFilter={this.onSetFilter} getMailCount={this.getMailCount}/>
                    <p> Unread Mails: ({this.state.unreadMailCount})/( {this.state.unreadMailCount+this.state.readMailCount})</p>
                    <div className="bar-unread"> <div className="bar-unread-inner" style={divStyle}></div></div>
                    </div> 
                }
                    </div>
               <div>
             
               </div>
               <div className="mail-main-bar">
               
                <div className="sorting">
                <MailSearch onSetFilter={this.onSetFilter} getMailCount={this.getMailCount}/>
                    <button className="sort-by-title" name="subject" onClick={()=>{this.setState({ sortBy: 'subject' },this.sort('subject'))}}> Title </button>
                    <button className="sort-by-date" name="date" onClick={()=>{this.setState({ sortBy: 'date' },this.sort('date'))}}> Date </button>
                    </div>
                    <MailList mails={mails} removePreviewedMail={this.removePreviewedMail} taggleIsReading={this.taggleIsReading} taggleIsStared={this.taggleIsStared}  />



                   

                    </div>
               



            </section>
        )
    }
}