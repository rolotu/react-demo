import React from "react"

class DataSource {
  addChangeListener(callback) {}

  removeChangeListener(callback) {}
}

function withSubscription(WrappedComponent, selectData) {
  return class extends React.Component {
    constructor(props) {
      super(props)
      this.handleChange = this.handleChange.bind(this)
      this.state = {
        data: selectData(DataSource, props)
      }
    }

    componentDidMount() {
      // ... 负责订阅相关的操作...
      DataSource.addChangeListener(this.handleChange)
    }

    componentWillUnmount() {
      DataSource.removeChangeListener(this.handleChange)
    }

    handleChange() {
      this.setState({
        data: selectData(DataSource, this.props)
      })
    }

    render() {
      return <WrappedComponent data={this.state.data} {...this.props} />
    }
  }
}

export default withSubscription