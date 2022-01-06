import React from "react"

export function FancyBorder(props) {
  return (
    <div className={'FancyBorder FancyBorder-' + props.color}>
      {props.children}
    </div>
  )
}

export function WelcomeDialog() {
  return (
    <FancyBorder color="blue">
      <h1 className="Dialog-title">
        Welcome
      </h1>
      <p className="dialog-message">
        Thank you for visiting our spacecraft!
      </p>
    </FancyBorder>
  )
}

export function Contacts() {
  return <div className="Contacts" />
}

export function Chat() {
  return <div className="Chat" />
}

export function SplitPane(props) {
  return (
    <div className="SplitPane">
      <div className="SplitPane-left">
        {props.left}
      </div>
      <div className="SplitPane-right">
        {props.right}
      </div>
    </div>
  )
}

export function Dialog(props) {
  return (
    <FancyBorder color="blue">
      <h1 className="Dialog-title">
        {props.title}
      </h1>
      <p className="dialog-message">
        {props.message}
      </p>
      {props.children}
    </FancyBorder>
  )
}

export class SignUpDialog extends React.Component {
  constructor(props) {
    super(props)
    this.state = { login: '' }
  }

  render() {
    return (
      <Dialog title="Mars Exploration Program"
        message="How should we refer to you?">
          <input value={this.state.login}
            onChange={this.handleChange.bind(this)} />
          <button onClick={this.handleSignUp.bind(this)}>
            Sign Me Up!
          </button>
      </Dialog>
    )
  }

  handleChange(e) {
    console.log(this)
    this.setState({ login: e.target.value })
  }
  handleSignUp() {
    alert(`Welcome aboard, ${this.state.login}!`)
  }
}