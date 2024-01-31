// Write your code here
import './index.css'
import {format} from 'date-fns'
import {Component} from 'react'

import {v4 as uuidv4} from 'uuid'
import AppointmentItem from '../AppointmentItem'

const initialList = []

class Appointments extends Component {
  state = {
    List: initialList,
    title: '',
    date: '',
    isStarred: false,
    starredPick: false,
  }

  onchangetitle = event => {
    this.setState({
      title: event.target.value,
    })
  }

  onchangedate = event => {
    this.setState({
      date: event.target.value,
    })
  }

  appendtoList = () => {
    const {title, date, isStarred} = this.state
    const newDate = format(new Date(date), 'dd MMMM yyyy, EEEE')
    if (title !== '' && date !== '') {
      const newData = {
        id: uuidv4(),
        title,
        date: newDate,
        isStarred,
      }
      this.setState(prevState => ({
        List: [...prevState.List, newData],
      }))
      const titleele = document.getElementById('title')
      titleele.value = ''
      const dateEle = document.getElementById('date')
      dateEle.value = ''
    }
  }

  starClick = id => {
    this.setState(prevState => ({
      List: prevState.List.map(eachList => {
        if (id === eachList.id) {
          return {...eachList, isStarred: !eachList.isStarred}
        }
        return eachList
      }),
    }))
  }

  starredListClick = () => {
    this.setState(prevState => ({starredPick: !prevState.starredPick}))
  }

  render() {
    const {starredPick, List} = this.state

    const starfiltered = List.filter(each => each.isStarred === true)
    const FinalList = starredPick ? starfiltered : List
    const classs = starredPick ? 'bac-color-btn' : 'bac-notcolored-btn'
    return (
      <div className="main">
        <div className="card">
          <div className="upperCard">
            <div className="left">
              <h1 className="head">Add Appointment</h1>
              <label className="title-label" htmlFor="title">
                Title
              </label>
              <br />
              <input
                onChange={this.onchangetitle}
                id="title"
                className="title"
                type="text"
              />
              <br />
              <label htmlFor="date" className="date-label" type="date">
                Date
              </label>
              <br />
              <input
                onChange={this.onchangedate}
                id="date"
                type="date"
                className="date"
              />
              <br />
              <button
                onClick={this.appendtoList}
                type="button"
                className="button"
              >
                Add
              </button>
            </div>
            <img
              className="imgg"
              src="https://assets.ccbp.in/frontend/react-js/appointments-app/appointments-img.png "
              alt="appointments"
            />
          </div>
          <hr />
          <div className="staredbutton-comnt">
            <h1 className="appointment-head">Appointments</h1>
            <button
              onClick={this.starredListClick}
              type="button"
              className={classs}
            >
              Starred
            </button>
          </div>
          <ul className="appointment-items">
            {FinalList.map(each => (
              <AppointmentItem
                key={each.id}
                clickedStar={this.starClick}
                item={each}
              />
            ))}
          </ul>
        </div>
      </div>
    )
  }
}
export default Appointments
