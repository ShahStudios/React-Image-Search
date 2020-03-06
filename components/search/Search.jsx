import React, { Component } from 'react'
import TextField from 'material-ui/TextField';
import SelectField from 'material-ui/SelectField';
import MenuItem from 'material-ui/MenuItem';
import axios from 'axios';
import ImageResults from '../image-results/ImageResults';
class Search extends Component {


    state = {
        searchText: '',
        amount: 15,
        apiUrl: 'https://pixabay.com/api',
        apiKey: '15501465-219bfc6d63ec2aef4bf3d6b76',
        images: []
    }

    onTextChange = (e) => {
        const val = e.target.value;
        this.setState({[e.target.name]: val}, () => {

            if (val === '') {
                this.setState({images: []});
            } else {
                axios.get(`${this.state.apiUrl}/?key=${this.state.apiKey}&q=${this.state.searchText}&image_type=photo&
                per_page=${this.state.amount}&safesearch=true`)
                .then(res => this.setState({images: res.data.hits}))
                .catch(err => console.log(err));
            }
            })
    }

    onAmountChange = (e, index, value) => this.setState({ amount: value });



    render() {
        console.log(this.state);
        return (
            <div>
                <TextField
                    name="searchText"
                    value = {this.state.searchText}
                    onChange = {this.onTextChange}
                    floatingLabelText="Kazi Image Search"
                    fullWidth={true}
                />
            <br/>

            <br/>

            {this.state.images.length > 0 ? (<ImageResults images ={this.state.images} />) : null}

            </div>
        )
    }
}

export default Search;