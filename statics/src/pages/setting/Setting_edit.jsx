import React, { Component } from 'react';
import { Setting } from '@/service'

import Energy_produced_setting from './components/energy_produced_setting'
import Status_change_setting from './components/status_change_setting'
import Status_threshold_setting from './components/status_threshold_setting'
import Status_dead_setting from './components/status_dead_setting'
import Status_restore_setting from './components/status_restore_setting'
import Energy_stealed_setting from './components/energy_stealed_setting'
import Withdraw_setting from './components/withdraw_setting'
import Energy_team_award from './components/energy_team_award'
import Status_assist_setting from './components/status_assist_setting'
import Energy_weather_award from './components/energy_weather_award'
import Energy_person_award from './components/energy_person_award'
import Help from './components/help'
import About from './components/about'
import Version from './components/version'

export default class Setting_edit extends Component {

  constructor(props) {
    super(props);
    this.state = {
        id : props.match.params.id,
        data : null,
        loading : true
    };
  }

  componentDidMount = async() => {
    let form = await Setting.get(this.state.id)
    let data = {}
    try {
      data = JSON.parse(form.data)
    } catch (error) { console.log(error) }
    this.setState({
      loading : false,
      ...form,
      data : data
    })
  }

  render() {
    if(this.state.loading){ return <div/> }
    switch (this.state.id) {
      case 'help' : return <Help data={this.state.data}/>
      case 'about' : return <About data={this.state.data}/>
      case 'energy_produced_setting' : return <Energy_produced_setting data={this.state.data}/>
      case 'status_change_setting' : return <Status_change_setting data={this.state.data}/>
      case 'status_threshold_setting':return <Status_threshold_setting data={this.state.data}/>
      case 'status_dead_setting':return <Status_dead_setting data={this.state.data}/>
      case 'energy_stealed_setting':return <Energy_stealed_setting data={this.state.data}/>
      case 'energy_person_award':return <Energy_person_award data={this.state.data}/>
      case 'energy_weather_award':return <Energy_weather_award data={this.state.data}/>
      case 'status_restore_setting':return <Status_restore_setting data={this.state.data}/>
      case 'status_assist_setting':return <Status_assist_setting data={this.state.data}/>
      case 'energy_team_award':return <Energy_team_award data={this.state.data}/>
      case 'withdraw_setting': return <Withdraw_setting data={this.state.data}/>
      case 'version': return <Version data={this.state.data}/>
      default: return <div/>
    }
  }

}
