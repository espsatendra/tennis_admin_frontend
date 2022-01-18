import React, { Component, Fragment } from 'react';
import config from '../config/config'
import Sidebar from '../directives/sidebar';
import Header from '../directives/header'
import axios from 'axios'
import toast, { Toaster } from 'react-hot-toast';

export default class timeslot extends Component {
	constructor(props) {
		super(props)
		this.state = {
			time_slot: [],
			timeslot: '',
			time_slot_chk: [],
			coartid: '',
			coart_name: '',
		};
		const { match: { params } } = this.props;
		this.coartid = params.coartid;

	}

	componentDidMount() {
		this.getAlltimeslot()
		this.getCoart_timeslot()
		this.getcoartname()
	}


	async getCoart_timeslot() {
		await axios.post(`${config.apiUrl}getCoart_timeslot`, { 'id': this.coartid },)
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

	async getcoartname() {
		await axios.post(`${config.apiUrl}getcoartname`, { 'id': this.coartid },)
			.then(result => {
				const data = result.data;
				console.log("ABC", result.data.response)

				if (result.data.success === true) {
					var coart_name = result.data.response[0].coart_name;
					var c_name = coart_name.charAt(0).toUpperCase() + coart_name.slice(1)
					this.setState({
						coart_name: c_name
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
		await axios.post(`${config.apiUrl}updatetimeslot`, { time_slot_chk: this.state.time_slot_chk,'coartid': this.coartid },)
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


															<h3>{this.state.coart_name}</h3>



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
