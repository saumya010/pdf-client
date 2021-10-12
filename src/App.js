import React, {Component} from 'react';
import axios from 'axios';
import {saveAs} from 'file-saver'
import './App.css';

class App extends Component {
	state = {
		name: '',
		receiptId: 0,
		price1: 0,
		price2: 0
	}

	handleChange = ({target: {value, name}}) => this.setState({[name]: value})

	createAndDownloadPdf = () => {
	    axios.post('/create-pdf', this.state)
	      .then(() => axios.get('fetch-pdf', { responseType: 'blob' }))
	      .then((res) => {
	        const pdfBlob = new Blob([res.data], { type: 'application/pdf' });

	        saveAs(pdfBlob, 'newPdf.pdf');
	    })
	}

	render() {
		return (
			<div className="App">
				<input type="text" name="name" placeholder="Name" onChange={this.handleChange} />
				<input type="number" name="receiptId" placeholder="Receipt ID" onChange={this.handleChange} />
				<input type="number" name="price1" placeholder="Price 1" onChange={this.handleChange} />
				<input type="number" name="price2" placeholder="Price 2" onChange={this.handleChange} />
				<button onClick={this.createAndDownloadPdf}>
					Download PDF
				</button>
			</div>
		);
	}
}

export default App;
