function MsgBox({userName, textColor="blue"}) {
  let styles = { color: textColor };
  return(
    <h4 style={styles}>Hello, {userName}</h4>
  )
}

export default MsgBox;