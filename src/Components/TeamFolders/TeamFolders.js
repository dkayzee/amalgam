import React, { Component } from 'react';
import './TeamFolders.css'

import axios from 'axios'

const URL = "https://yuuvis.io/api/dms/objects/search"

class TeamFolders extends Component{
    constructor(){
        super()
        this.state = {
            teamNames: null,
            isLoaded: false
        }
    }

    fetchTeamNames = async() => {
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
                "statement": "SELECT tenNyc058:teamName FROM enaio:object GROUP BY tenNyc058:teamName",
                "skipCount": 0,
                "maxItems": 50
                }
            },
            url: URL
        })
        this.setState({teamNames: resp.data.objects, isLoaded: true})
    }

    componentDidMount(){
        this.fetchTeamNames()
    }

    render(){
        const renderTeams = this.state.isLoaded ? this.state.teamNames.map(team => {
            return <div className="teamFolders_buttons">{team.properties["tenNyc058:teamName"].value}</div>
        }) : null

        return(
            <div className="teamFolders_wrapper">
                <div className="teamFolders_header"><h1>Team Folders</h1></div>
                <div className="teamFolders_container">
                    {renderTeams}
                </div>
            </div>
        )
    }
}

export default TeamFolders;