define(["react","api"], function(React, ApiMixin){
    "use strict";
    var ClipForm = React.createClass({

        mixins: [ApiMixin,React.addons.LinkedStateMixin],
        
        getInitialState : function(){
            return {"Quarter": [],
                    "_Yards" : [0],
                    "Play Type" : [],
                    "Points" : [],
                    "Play Outcome" : [],
                    "_On Offense/Defense" : [],



            };
        },
        componentWillReceiveProps : function(nextProps){
            this.setState(nextProps.data);
        },
        handleInput : function(event){
            var inputName = $(event.target).attr('name');
            var inputData = {};
            inputData[inputName] = [];
            inputData[inputName].push($(event.target).val());
            this.setState(inputData);

        },
        handleRadioButton : function(event){

           var dataLabel = $(event.target).attr('name');
           var inputs = "input[name='"+dataLabel+"']";
           $(inputs).parent().removeClass('highlighted');
           $(event.target).parent().addClass('highlighted');
           var radioData = {};
           radioData[dataLabel] = [];
           radioData[dataLabel].push($(event.target).val());
           this.setState(radioData);
        },
        handleCheckbox : function(event){
            var checkbox = $(event.target);
            var dataLabel = checkbox.attr('name');
            var checkboxArray = this.state[dataLabel].slice();
        
            if(checkbox.is(":checked")){
                checkboxArray.push(checkbox.val());
                
            }else{
                var index = checkboxArray.indexOf(checkbox.val());
                if(index > -1){
                    checkboxArray.slice(index,1);
                }
            }
            var checkboxData = {};
            checkboxData[dataLabel] = checkboxArray;
            this.setState(checkboxData,function(){
                console.log(this.state);
            });

        },

        selectCheckbox : function(name, value){
            console.log("NAME: "+name+" VALUE: "+value);
            console.log(this.state[name].indexOf(value));
            return this.state[name].indexOf(value) > - 1;
        },
        highlightCheckedRadio : function(){
            $("input[type='radio']:checked").parent().addClass('highlighted');
        },
        uploadData : function(e){
            console.log("Upload Data called");
            var playOutcomeArray = this.state['Play Outcome'].slice();
            var yardRange = this.calculateYardRange();
            var extraPlayOutcome = this.calculatePlayOutcome();
            var extraData = {};
            extraData["Yardage"] = [yardRange];
            extraData['Play Outcome'] = extraPlayOutcome;
            this.setState(extraData,function(){
                
                this.sendData();
                
            });
            e.preventDefault();
            e.stopPropagation();
        },
        calculatePlayOutcome : function(){
            var playOutcomeArray = this.clearPlayOutcome();

            if(this.state["_Yards"] > 0){
                playOutcomeArray.push("Gain");
            }else if(this.state["_Yards"] < 0){
                playOutcomeArray.push("Loss");
            }else{
                playOutcomeArray.push("No Gain");
            }
            return playOutcomeArray;

        },
        clearPlayOutcome : function(){
            var outcomes = ['Gain','Loss','No Gain'];
            var playOutcomeArray = this.state["Play Outcome"].slice();
            console.log(playOutcomeArray);
            for(var i=0; i < outcomes.length; i++){
                var index = playOutcomeArray.indexOf(outcomes[i]);
                while(index > -1){
                    playOutcomeArray.slice(index,1);
                    index = playOutcomeArray.indexOf(outcomes[i]);
                }
            }
            console.log(playOutcomeArray);
            return playOutcomeArray;
            
        },
        calculateYardRange : function(){
            var yards = this.state["_Yards"];
            if(yards < 0){
                return "Negative";
            }else if(yards > 0 && yards < 6){
                return "0-5";
            }else if(yards > 5 && yards < 11){
                return "6-10";
            }else if(yards > 10 && yards < 21){
                return "10-20";
            }else if(yards > 20 && yards < 41){
                return "21-40";
            }else{
                return "41+";
            }
            
        },
        sendData : function(){
            var jsonString = JSON.stringify(this.state);
            $.ajax({
                  type : "PUT",
                  url: this.apiUrl+"/show/"+this.props.showid+"/clip/"+this.props.data.id,
                  data : jsonString,
                  contentType: "application/json"
                }).done(function( data ) {
                    if ( console && console.log ) {
                      console.log( "Sample of data:", data.slice( 0, 100 ) );
                    }
                  });
        },
        componentDidMount : function(){
            this.highlightCheckedRadio();
        },
       render: function(){
         return <form className={this.props.showForm}>
                    <div className="grid">

                        <div className="col-1-1">
                            <label>Quarter</label>
                            <select name="Quarter" onChange={this.handleInput} value={this.state["Quarter"][0]}>
                                <option value="">Select</option>
                                <option value="1">1</option>
                                <option value="2">2</option>
                                <option value="3">3</option>
                                <option value="4">4</option>
                            </select>
                            <label>Yardage</label>
                            <input type="number" name="_Yards" min="-100" max="100" step="1" onChange={this.handleInput} value={this.state["_Yards"][0]}/>
                            
                            
                        </div>
                        <div className="col-1-1">
                            <label>Play Type</label>
                            <label className="radio"><input type="radio" name="Play Type" data-label="play_type" value="Pass"  onChange={this.handleRadioButton} checked={this.selectCheckbox('Play Type','Pass')}/>Pass</label>
                            <label className="radio"><input type="radio" name="Play Type" data-label="play_type" value="Run"  onChange={this.handleRadioButton} checked={this.selectCheckbox('Play Type','Run')}/>Run</label>
                            <label className="radio"><input type="radio" name="Play Type" data-label="play_type" value="Kickoff"  onChange={this.handleRadioButton} checked={this.selectCheckbox('Play Type','Kickoff')}/>Kickoff</label>
                            <label className="radio"><input type="radio" name="Play Type" data-label="play_type" value="Punt"  onChange={this.handleRadioButton} checked={this.selectCheckbox('Play Type','Punt')}/>Punt</label>
                            <label className="radio"><input type="radio" name="Play Type" data-label="play_type" value="Field Goal"  onChange={this.handleRadioButton} checked={this.selectCheckbox('Play Type','Field Goal')}/>Field Goal</label>
                            <label className="radio"><input type="radio" name="Play Type" data-label="play_type" value="PAT"  onChange={this.handleRadioButton} checked={this.selectCheckbox('Play Type','PAT')}/>PAT</label>
                            <label className="radio"><input type="radio" name="Play Type" data-label="play_type" value="Penalty"  onChange={this.handleRadioButton} checked={this.selectCheckbox('Play Type','Penalty')}/>Penalty</label>
                         </div>
                        
                        <div className="col-1-1">
                              
                            <label>Play Outcome</label>
                            <label className="checkbox">  <input type="checkbox" name="Play Outcome" data-label="play_outcome" value="Safety" onChange={this.handleCheckbox} checked={this.selectCheckbox('Play Outcome','Safety')}/> Safety</label>
                            <label className="checkbox">  <input type="checkbox" name="Play Outcome" data-label="play_outcome" value="Touchdown" onChange={this.handleCheckbox} checked={this.selectCheckbox('Play Outcome','Touchdown')}/> Touchdown</label>
                            <label className="checkbox">  <input type="checkbox" name="Play Outcome" data-label="play_outcome" value="Interception" onChange={this.handleCheckbox} checked={this.selectCheckbox('Play Outcome','Interception')}/> Interception</label>
                            <label className="checkbox">  <input type="checkbox" name="Play Outcome" data-label="play_outcome" value="Fumble" onChange={this.handleCheckbox} checked={this.selectCheckbox('Play Outcome','Fumble')}/> Fumble</label>
                            <label className="checkbox">  <input type="checkbox" name="Play Outcome" data-label="play_outcome" value="Sack" onChange={this.handleCheckbox} checked={this.selectCheckbox('Play Outcome','Sack')}/> Sack</label>
                            <label className="checkbox">  <input type="checkbox" name="Play Outcome" data-label="play_outcome" value="Penalty" onChange={this.handleCheckbox} checked={this.selectCheckbox('Play Outcome','Penalty')}/> Penalty</label>
                                /*GAIN LOSS*/
                         </div>
                         <div className="col-1-1">
                            <label>Points</label>
                            <label className="radio"><input type="radio" name="Points" data-label="points" value="0" onChange={this.handleRadioButton} defaultChecked/>0</label>
                            <label className="radio"><input type="radio" name="Points" data-label="points" value="1" onChange={this.handleRadioButton} />1</label>
                            <label className="radio"><input type="radio" name="Points" data-label="points" value="2" onChange={this.handleRadioButton} />2</label>
                            <label className="radio"><input type="radio" name="Points" data-label="points" value="3" onChange={this.handleRadioButton} />3</label>
                            <label className="radio"><input type="radio" name="Points" data-label="points" value="6" onChange={this.handleRadioButton} />6</label>
                        </div>
                        <div className="col-1-1">
                            
                            <label>Points Scored on Offense/Defense</label>
                            <label className="radio"><input type="radio" name="_On Offense/Defense" data-label="_on_offense_defense" value="Offense"  onChange={this.handleRadioButton}/>Offense</label>
                            <label className="radio"><input type="radio" name="_On Offense/Defense" data-label="_on_offense_defense"  value="Defense"  onChange={this.handleRadioButton}/>Defense</label>
                            
                        </div>
                        <div className="col-1-1">
                            <input type="submit" value="Upload Data" onClick={this.uploadData}/>
                        </div>
                    </div>
         		</form>
       }
    })
    return ClipForm;
} );