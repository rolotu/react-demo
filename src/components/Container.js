const styles = {
  borderBottom: '1px solid #eee',
  paddingBottom: '20px'
}

function Container(props) {
  return (
    <div className="Container" style={styles}>
      <h2>{props.label}</h2>
      {props.children}
    </div>
  )
}

export default Container