import React, { Component } from "react";
import M from "materialize-css";
import "materialize-css/dist/css/materialize.min.css";
import ModalForm from './editform'
class Modal extends Component {
  componentDidMount() {
    const options = {
      onOpenEnd: () => {
        // console.log(this.props.Item);
      },
      inDuration: 250,
      outDuration: 250,
      opacity: 0.5,
      dismissible: true,
      startingTop: "4%",
      endingTop: "10%"
    };
    M.Modal.init(this.Modal, options);
  }

  render() {
    // console.log(this.props.Item)
    return (
      <>
        <a
          className="waves-light btn modal-trigger"
          data-target={this.props.Item.id}
        >
          Update
        </a>

        <div
          ref={Modal => {
            this.Modal = Modal;
          }}
          id={this.props.Item.id}
          className="modal"
        >
          <div className="modal-content">
            <ModalForm data={this.props.Item} />
          </div>
          {/* <div class="modal-footer">
            
          </div> */}
        </div>
      </>
    );
  }
}

export default Modal;