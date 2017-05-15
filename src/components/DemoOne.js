import React, { Component, PropTypes } from 'react';
import AriaModal from 'react-aria-modal';
import { connect } from 'react-redux';
import { onConfirmation } from '../actions/index';
import Confirmation from './Confirmation'

class DemoOne extends Component {
  constructor(props) {
    super(props);

    this.state = {
      modalActive: false
    }

    this.activateModal = this.activateModal.bind(this);
    this.deactivateModal = this.deactivateModal.bind(this);
    this.getApplicationNode = this.getApplicationNode.bind(this);
    this.closeModel = this.closeModel.bind(this);
    this.confirmationCallback = this.confirmationCallback.bind(this);
  }

  activateModal = () => {
    this.setState({ modalActive: true });
  }

  deactivateModal = () => {
    this.setState({ modalActive: false });
  }

  getApplicationNode = () => {
    return document.getElementById('application');
  }

  confirmationCallback() {
    console.log("Callback is executed !");
    this.props.onConfirmation(false);
  }

  closeModel () {
      this.props.onConfirmation(true);
      console.log("Closing the model !");
  }

  render() {
    const {
     okLabbel = 'OK',
     cancelLabel = 'Cancel',
     title,
     confirmation,
     show,
     proceed,
     dismiss,
     cancel,
     enableEscape = true,
   } = this.props;

    const modal =
        <AriaModal
          titleText="demo one"
          onExit={this.deactivateModal}
          mounted={this.state.modalActive}
          initialFocus="#demo-one-deactivate"
          getApplicationNode={this.getApplicationNode}
          underlayStyle={{ paddingTop: '2em' }}
        >
          <div id="demo-one-modal" className="">
            <div className='model-title'>
              <h3 className='pe-title'>Create a Question</h3>
              <button type='button' className='pe-icon--remove-lg-18' onClick={this.closeModel}>Close Modal</button>
            </div>
            <div className="modal-body">
              <p>
                Here is a modal
                {' '}
                <a href="#">with</a>
                {' '}
                <a href="#">some</a>
                {' '}
                <a href="#">focusable</a>
                {' '}
                parts.
              </p>
            </div>
            <footer className="modal-footer">
              <button id="demo-one-deactivate" onClick={this.deactivateModal}>
                deactivate modal
              </button>
            </footer>
          </div>
        </AriaModal>;

    return (
      <div>
        <button onClick={this.activateModal}>
          activate modal
        </button>
        {modal}
        <Confirmation confirmation="Do you want to delete this?" title='Would you like to remove this item from the list?'
            okLabbel= 'Yes'  cancelLabel= 'No' modalActive={this.props.modalActive} proceed={this.confirmationCallback} cancel= {this.confirmationCallback} />
      </div>
    );
  }
}

DemoOne.propTypes = {
  okLabbel: PropTypes.string,
  cancelLabel: PropTypes.string,
  title: PropTypes.string,
  confirmation: PropTypes.string,
  show: PropTypes.bool,
  proceed: PropTypes.func,     // called when ok button is clicked.
  cancel: PropTypes.func,      // called when cancel button is clicked.
  dismiss: PropTypes.func,     // called when backdrop is clicked or escaped.
  enableEscape: PropTypes.bool,
}


const mapStateToProps = (state) => {
  console.log("Calling mapStateToProps here!" + state.confirmation.modalActive);
  return { modalActive: state.confirmation.modalActive };
}
export default connect(mapStateToProps, { onConfirmation })(DemoOne);
