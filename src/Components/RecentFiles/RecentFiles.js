import React, { Component } from 'react';
import { Redirect } from 'react-router-dom'
import './RecentFiles.css'

import axios from 'axios'

const URL = "https://yuuvis.io/api/dms/objects/search"

class RecentFiles extends Component{
    constructor(){
        super()
        this.state = {
            recentObjects: null,
            isLoaded: false,
            clickedObjectId: null
        }
    }

    fetchRecentObjects = async() => {
        const resp = await axios({
            method: 'POST',
            headers: {
                "X-ID-TENANT-NAME": "nyc058",
                "accept": "application/json",
                "Content-Type": "application/json",
                "Authorization": "Basic YWRtaW46eVduV3RKSllKR0lJ"
            },
            data: {
                query: {
                "statement": "SELECT * FROM enaio:object ORDER BY enaio:lastModificationDate DESC",
                "skipCount": 0,
                "maxItems": 8
                }
            },
            url: URL
        })
        this.setState({recentObjects: resp.data.objects, isLoaded: true})
    }

    componentDidMount(){
        this.fetchRecentObjects()
    }

    // handleClick = (id) => {
    //     console.log("ui work")
    //     return <Redirect to={`/${id}`} />
    // }

    render(){
        const renderRecentFiles = this.state.isLoaded ? this.state.recentObjects.map(object => {
            return (
                <div className="">
                    <span>{object.properties["enaio:objectId"].value}</span>
                    <span>{object.properties["Name"].value}</span>
                    <button onClick={() => this.setState({clickedObjectId: object.properties["enaio:objectId"].value})}>View Document</button>
                </div>
            ) 
        }) : null

        if(this.state.clickedObjectId === null){
            return(
                <div className="RecentFiles_wrapper">
                    <div className="RecentFiles_header"><h1>Recent Files</h1></div>
                    <div className="RecentFiles_container">{renderRecentFiles}</div>
                </div>
            )
        }
        else{
            return <Redirect to={`/${this.state.clickedObjectId}`} />
        }
    }
}

export default RecentFiles;