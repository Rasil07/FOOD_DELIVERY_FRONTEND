import React, { Component, Fragment } from "react";
import { TableWrapper } from "../../styles/MainStyles";
import { Table } from "reactstrap";
import { connect } from "react-redux";
import { getAllOrders } from "../../redux/actions/orderActions";
import ShowOrderedListModal from "./modals/order/showOrderListModal";
import CustomerDetailModal from "./modals/order/customerDetailModal";
import DeleteOrderModal from "./modals/order/deleteOrder";

function msToTime(ms) {
  var seconds = ms / 1000;
  var minutes = parseInt(seconds / 60, 10);
  seconds = Math.floor(seconds % 60);
  var hours = parseInt(minutes / 60, 10);
  minutes = minutes % 60;

  return hours + " hr :" + minutes + " mins :" + seconds + " secs";
}

function TimeDIff(props) {
  let prevDate = new Date(props.date);
  let prevDateTime = prevDate.getTime();
  let todayDate = new Date();
  let todayDateTime = todayDate.getTime();
  let ms = Math.abs(todayDateTime - prevDateTime);
  return msToTime(ms);
}
function GetDate(props) {
  let date = new Date(props.date);
  let year = date.getFullYear();
  let month = date.getMonth() + 1;
  let day = date.getDate();
  let fullDate = year + "-" + month + "-" + day;
  return fullDate;
}

class Order extends Component {
  constructor(props) {
    super(props);
  }
  componentDidMount() {
    this.props.getAllOrders();
  }
  renderOrderList() {
    let allOrders = this.props.orders;
    const order = allOrders.map((item, index) => (
      <tr key={index}>
        <td scope="row">{index + 1}</td>

        <td>
          <CustomerDetailModal customer={item.ordered_by} />
        </td>
        <td>
          {item.order_list ? (
            <ShowOrderedListModal list={item.order_list.items} />
          ) : (
            <p>No list</p>
          )}
        </td>

        <td>{item.total_price}</td>
        <td>
          {item.delivery_status ? <p>Delivered</p> : <p>Not Delivered</p>}
        </td>
        <td>
          <GetDate date={item.ordered_date} />
        </td>
        <td>
          <TimeDIff date={item.ordered_date} />
        </td>

        <td>
          <DeleteOrderModal id={item._id} />
        </td>
      </tr>
    ));
    return order;
  }
  render() {
    return (
      <Fragment>
        <h1>Order</h1>
        <TableWrapper>
          <Table borderless hover responsive size="sm">
            <thead>
              <tr>
                <th>#</th>
                <th>Ordered By</th>
                <th>Order List</th>
                <th>Total</th>
                <th>Delivery Status</th>
                <th>Ordered Date(year-month-date)</th>
                <th>Duration(in Hours)</th>
                <th colSpan="2">Actions</th>
              </tr>
            </thead>
            <tbody>
              {this.props.orders && this.props.orders.length ? (
                this.renderOrderList()
              ) : (
                <h1>No orders yet</h1>
              )}
            </tbody>
          </Table>
        </TableWrapper>
      </Fragment>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    isAdmin: state.auth.isAdmin,
    user: state.auth.user,
    orders: state.orders.orders,
  };
};
export default connect(mapStateToProps, { getAllOrders })(Order);
