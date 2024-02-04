import '../css/ConfirmDialog.css';

function ConfirmDialog(props) {

  function cancelHandler() {
    props.onCancel();
  }

  function confirmHandler() {
    props.onConfirm();
  }

  return (
    <div className='confirm-dialog'>
      <div className='backdrop'>
        <div className='modal'>
          <p>{props.message}</p>
          <button className="btn btn-edit small" name="confirm"
            onClick={confirmHandler} >Confirm</button>
          <button className="btn btn-cancel small ml" name="cancel"
            onClick={cancelHandler} >Cancel</button>          
        </div>
      </div>
    </div>
  );
}

export default ConfirmDialog;