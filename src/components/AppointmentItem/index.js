// Write your code here
import './index.css'

const AppointmentItem = props => {
  const {clickedStar, item} = props
  const {id, title, date, isStarred} = item
  const image = isStarred
    ? 'https://assets.ccbp.in/frontend/react-js/appointments-app/filled-star-img.png'
    : 'https://assets.ccbp.in/frontend/react-js/appointments-app/star-img.png'

  const onClickStar = () => {
    clickedStar(id)
  }

  return (
    <li className="item-card">
      <div className="name-star-container">
        <p className="name">{title}</p>
        <button
          data-testid="star"
          className="button-star"
          type="button"
          onClick={onClickStar}
        >
          <img className="star" src={image} alt="star" />
        </button>
      </div>
      <p className="dateday">{date}</p>
    </li>
  )
}
export default AppointmentItem
