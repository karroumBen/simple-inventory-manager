const ValidationError = ({ item }) => {
  return (
    <div className={item.isValid ? 'valid-criteria': 'invalid-criteria'}>
      <b>{item.name}</b>
    </div>
  )
}

export default ValidationError