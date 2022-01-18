import React, { Component, Fragment } from 'react';
import config from '../config/config'
import Sidebar from '../directives/sidebar';
import Header from '../directives/header'
import axios from 'axios'
import toast, { Toaster } from 'react-hot-toast';

export default class coachtimeslot extends Component {
	constructor(props) {
		super(props)
		this.state = {
			time_slot: [],
			timeslot: '',
			time_slot_chk: [],
			coachid: '',
			name: '',
		};
		const { match: { params } } = this.props;
		this.coachid = params.coachid;

	}

	componentDidMount() {
		this.getAlltimeslot()
		this.getCoach_timeslot()
		this.getcoachname()
	}


	async getCoach_timeslot() {
		await axios.post(`${config.apiUrl}getCoach_timeslot`, { 'id': this.coachid },)
			.then(result => {
				const data = result.data;
				const arrayColumn = (arr, n) => arr.map(x => '' + x[n] + '');
				if (result.data.success === true) {
					var time_slot_available = arrayColumn(result.data.response, 'slot_id');
					this.setState({
						time_slot_chk: time_slot_available
					})
					console.log(this.state.time_slot_chk)
				}
			})
			.catch(err => {
			})
	}

	async getcoachname() {
		await axios.post(`${config.apiUrl}getcoachname`, { 'id': this.coachid },)
			.then(result => {
				const data = result.data;
				console.log("ABC", result.data.response)

				if (result.data.success === true) {
					var name = result.data.response[0].name;
					var c_name = name.charAt(0).toUpperCase() + name.slice(1)
					this.setState({
						name: c_name
					})
				}
			})
			.catch(err => {
			})
	}

	handleChangeRow1 = e => {
		var key = e.target.id;
		let arr = this.state.time_slot_chk;
		const checked = e.target.checked;
		const chk_val = e.target.value;

		if (checked) {
			arr.push(chk_val);
		} else {
			const index = arr.indexOf(chk_val);
			if (index > -1) {
				arr.splice(index, 1);
			}
		}
		this.setState({
			time_slot_chk: arr
		})
		console.log(arr)
	}

	async getAlltimeslot() {
		await axios.get(`${config.apiUrl}getmytimeslot`, {},)
			.then(result => {
				const data = result.data;
				console.log("ABC", result.data.response)

				if (result.data.success === true) {
					this.setState({
						time_slot: result.data.response
					})
				}
			})
			.catch(err => {
			})
	}

	async submit() {
		await axios.post(`${config.apiUrl}updatetimecoachslot`, { time_slot_chk: this.state.time_slot_chk,'coachid': this.coachid },)
			.then(result => {
				toast.success(result.data.msg, {});
				window.location.reload();
			})
			.catch(err => {
			})
	}



	render() {
		return (
			<>
<Toaster/>

				<Sidebar />

				<div className="all-content-wrapper">
					<div className="container-fluid">
						<div className="row">
							<div className="col-lg-12 col-md-12 col-sm-12 col-xs-12">
								<div className="logo-pro">
									<a href="index.html"><img className="main-logo" src="img/logo/logo.png" alt="" /></a>
								</div>
							</div>
						</div>
					</div>
					<Header />
					{/* Basic Form Start */}
					<div className="basic-form-area mg-b-15">
						<div className="container-fluid">


							<div className="row">
								<div className="col-lg-12 col-md-12 col-sm-12 col-xs-12">
									<div className="sparkline12-list">



										<div className="data-table-area mg-b-15">
											<div className="container-fluid">
												<div className="col-lg-12 col-md-12 col-sm-12 col-xs-12">

													<div className="sparkline13-list">

														<div className="sparkline13-graph">

                                                             <h3>Update Coach Time</h3>
															<h3>{this.state.name}</h3>



															<div className="datatable-dashv1-list custom-datatable-overright">

																<table id="table" data-toggle="table" data-pagination="true" data-search="true" data-show-columns="true" data-show-pagination-switch="true" data-show-refresh="true" data-key-events="true" data-show-toggle="true" data-resizable="true" data-cookie="true" data-cookie-id-table="saveId" data-show-export="true" data-click-to-select="true" data-toolbar="#toolbar">
																	<thead>
																		<tr>
																			{/* <th data-field="state" data-checkbox="true" /> */}

																			<th data-field="name" data-editable="true">checkbox</th>
																			<th data-field="name" data-editable="true">Time Start</th>
																			<th data-field="name" data-editable="true">Time End</th>

																		</tr>
																	</thead>
																	<tbody>
																		{this.state.time_slot.map((item, i) => (
																			<tr>
																				<td>
																					{(this.state.time_slot_chk.indexOf(''+item.id+'') > -1 ?
																						<input className="t_chk" type="checkbox" value={item.id} id={i} onChange={this.handleChangeRow1} checked />
																						:
																						<input className="t_chk" type="checkbox" value={item.id} id={i} onChange={this.handleChangeRow1} />
																					)}
																				</td>
																				<td>{item.start_time}</td>
																				<td>{item.end_time}</td>

																			</tr>
																		))}
																	</tbody>

																</table>
															</div>



														</div>
													</div>
												</div>
											</div>



											<button type="button" className="btn btn-secondary" onClick={this.submit.bind(this)} data-dismiss="modal" >Submit</button>



											{/* </div> */}
										</div>
									</div>

								</div>
							</div>
						</div>
					</div>


				</div>

			</>

		)
	}
}
