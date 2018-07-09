import React from 'react';
import moment from 'moment';
import './Calendar.css';
import Popup from "reactjs-popup";

export default class Calendar extends React.Component {
    state = {
        dateContext: moment(),
        today: moment(),
        showMonthPopup: false,
        selectedDay: null
    }

    constructor(props) {
        super(props);

        this.state.myEvent= '';
        this.state.begin= '';
        this.state.end= '';
        this.state.test='';
        this.width = props.width || "650px";
        this.style = props.style || {};
        this.style.width = this.width; // add this
      
    }


    weekdays = moment.weekdays(); //["Sunday", "Monday", "Tuesday", "Wednessday", "Thursday", "Friday", "Saturday"]
    weekdaysShort = moment.weekdaysShort(); // ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"]
    months = moment.months();



    EventCreationFunction = (date) => {
        
            fetch('http://localhost:3003/events', { // sync IP address to expo application
                mode: 'cors',
                method: 'POST',
                cache: 'default',
                
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json',
                },

                body: JSON.stringify({
                    date:date,
                    myEvent: this.state.myEvent,
                    begin: this.state.begin,
                    end: this.state.end,
                })
            })
            .then(response => response.json())
            .then ((res) => {
                if(res.success === true){
                    window.alert("Event Added");
                }
                else{
                    alert("Please make sure that times are between 0-24");
                }
            })
            .then(jsondata => console.log(jsondata))    
        }


    ReturnEventsFunction = (date) => {
        console.log("In ReturnEventsFunc method", date);
        const url = "http://localhost:3003/events?date=" + date
           
            fetch(url, { 
                mode: 'cors',
                method: 'GET',
                
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json',
                },
            })

            .then(response =>response.json())
            .then(json => {
                this.printStuff(json);
            });
         }

     showEvent = (e, d) => {
            var date= this.year().concat('-', this.monthNum(),'-',d);
            console.log(date);
            (this.ReturnEventsFunction( date));
        }

    printStuff=(json)=> {
       alert(JSON.stringify(json));
    }

    year = () => {
        return this.state.dateContext.format("Y");
    }
    month = () => {
        return this.state.dateContext.format("MMMM");
    }
    monthNum = () =>{
        return this.state.dateContext.format("MM")
    }
    daysInMonth = () => {
        return this.state.dateContext.daysInMonth();
    }
    currentDate = () => {
        console.log("currentDate: ", this.state.dateContext.get("date"));
        return this.state.dateContext.get("date");
    }
    currentDay = () => {
        return this.state.dateContext.format("D");
    }

    firstDayOfMonth = () => {
        let dateContext = this.state.dateContext;
        let firstDay = moment(dateContext).startOf('month').format('d');
        return firstDay;
    }

    setMonth = (month) => {
        let monthNo = this.months.indexOf(month);
        let dateContext = Object.assign({}, this.state.dateContext);
        dateContext = moment(dateContext).set("month", monthNo);
        this.setState({
            dateContext: dateContext
        });
    }

    onSelectChange = (e, data) => {
        this.setMonth(data);
        this.props.onMonthChange && this.props.onMonthChange();
    }

    SelectList = (props) => {
        let popup = props.data.map((data) => {
            return (
                <div key={data}>
                    <a href="#" onClick={(e)=> {this.onSelectChange(e, data)}}>
                        {data}
                    </a>
                </div>
            );
        }
        );

        return (
            <div className="month-popup">
                {popup}
            </div>
        );
    }

    onChangeMonth = (e, month) => {
        this.setState({
            showMonthPopup: !this.state.showMonthPopup
        });
    }

    MonthNav = () => {
        return (
            <span className="label-month"
                onClick={(e)=> {this.onChangeMonth(e, this.month())}}>
                {this.month()}
                {this.state.showMonthPopup &&
                 <this.SelectList data={this.months} />
                }
            </span>
        );
    }

    curYear = () => {
        return (
            <span
                className="label-year">
                {this.year()}
            </span>
        );
    }

    onDayClick = (e, day) => {
        this.setState({
            selectedDay: day
        }, () => {
            console.log("SELECTED DAY: ", this.state.selectedDay);

        });
        console.log("function conz");
        window.alert("This should show the events list");
       
        this.props.onDayClick && this.props.onDayClick(e, day);
    }

    addEvent = (e, d) => {
        var myEvent = prompt("Please enter an Event", "");
        this.state.myEvent=myEvent;
        this.setState({myEvent});
    }

    addbegin = (e, d) => {
        var begin = prompt("Please enter a start time: ", "");
        this.setState({begin});        
    }

     addend= (e, d) => {
        var end = prompt("Please enter an end time: ", "");
        this.setState({end});
    }
   
    sendData = (e, d) =>{
        var date= this.year().concat('-', this.monthNum(),'-',d);
        this.EventCreationFunction(date);
    } 


//render start here


    render() {
        let weekdays = this.weekdaysShort.map((day) => {
            return (
                <td key={day} className="week-day">{day}</td>
            )
        });
               
        let blanks = []; 

        for (let i = 0; i < this.firstDayOfMonth(); i++) {
            
            blanks.push(<td key={i * 80} className="emptySlot"> 
                {""}
                </td>
            );
        }

        let daysInMonth = [];

        for (let d = 1; d <= this.daysInMonth(); d++) {
            let className = (d === this.currentDay() ? "day current-day": "day");
            let selectedClass = (d === this.state.selectedDay ? " selected-day " : "")
            daysInMonth.push(
                <td key={d} className={className + selectedClass} >
            
                <span onClick={(e)=>{this.onDayClick(e, d)}}>{d}</span>
                 
                 <Popup trigger={<button className="button"> Add Event </button>} modal>
                 <button onClick ={ (e)=> {this.addEvent(e, d)}}>  Add Event </button>
                 - val between 0 & 24 -->
                 <button onClick ={ (e)=> {this.addbegin(e, d)}}>  Add Start Time </button>
                 -
                 <button onClick ={ (e)=> {this.addend(e, d)}}>  Add End Time </button>
                 -Press 'OK' to Submit -
                 <button onClick ={ (e)=> {this.sendData(e,d)}}>  OK </button>
                 </Popup>
  
                <Popup trigger={<button className="button"> View Events </button>} modal>
                <text onClick ={ (e)=> {this.showEvent(e,d)}}> Show All Events </text>
                </Popup>
                </td>
            );
        }

        var totalSlots = [...blanks, ...daysInMonth]; 
        let rows = [];
        let cells = [];

        totalSlots.forEach((row, i) => {
            if ((i % 7) !== 0) {
                cells.push(row);
            } else {
                let insertRow = cells.slice();// create new row
                rows.push(insertRow);
                cells = [];
                cells.push(row);
            }
            if (i === totalSlots.length - 1) { // if you're at the end of the aray
                let insertRow = cells.slice();
                rows.push(insertRow);
            }
        });



        let mBoxes = rows.map((d, i) => {
            return (
                <tr key={i*100}>
                    {d}
                </tr>
            );
        })

        return (
            <div className="calendar-container" style={this.style}>
                <table className="calendar">
                    <thead>
                        <tr className="calendar-header">
                            <td colSpan="5">
                              <this.MonthNav />
                                {"  "}
                             <this.curYear />  
                            </td>
                        </tr>
                    </thead>
                    <tbody>
                        <tr>
                            {weekdays}
                        </tr>
                             {mBoxes}
                    </tbody>
                </table>

            </div>

        );
    }
}