import React, { useEffect, useState } from 'react';
import { render } from 'react-dom';
import { ActivityIndicator,View, Text, Button, TouchableOpacity } from 'react-native';
import styles from './style';
import axios from 'axios';

const ListItem = (props) => {
    const [count, setCount] = useState(0)
    const [playerData, setPlayerData] = useState(0)
 //   const [playerData, setPlayerData] = useState(0)
    const [isVisible, setIsVisible] = useState(false)
    const [hasStats, setHasStats] = useState(true)
    const [hasLiveGame, setHasLiveGame] = useState(false)
    foo2();
    
//  let playerData;
//     let playerBoxScore
//     let latestString
//     let activate = true


    const cardColor = () => {
        if (hasLiveGame == false){
            return 'gray'
        } else if (count.isOnCourt == true){
            return 'green'
        } else {
            return 'red'
        }
    }

    async function getPlayers(){
        return await axios.get(`http://data.nba.net/prod/v1/2020/players.json`).then(response => response.data.league.standard);
}

    async function getStatsOfPlayer(player){
        return await axios.get(`http://data.nba.net/prod/v1/2020/players/${player.personId}_profile.json`).then(response => response.data.league.standard.stats.latest);
    }

    async function getLiveGames(){
        let gameDate = '20210501'
        return await axios.get(`http://data.nba.net/prod/v2/${gameDate}/scoreboard.json`).then(
            response => response.data.games.filter(
            // game => ((game.isGameActivated == true) && (game.hTeam.teamId == playerData.teamId || game.vTeam.teamId == playerData.teamId))
                game => ((game.hTeam.teamId == playerData.teamId || game.vTeam.teamId == playerData.teamId))
        ));
    }

    async function getPlayerData(players){
        let lastName = props.goal.value;
        let a = await players.filter(player => player.lastName == lastName);
        setPlayerData(a[0]);
    }

    async function getGameBoxScore (gameId){
        let gameDate = 20210501;
        let string = `http://data.nba.net/prod/v1/${gameDate}/${gameId}_boxscore.json`;
        return await axios.get(string)
        //.then(res => console.log(res.basicGameData.stats.activePlayers));
        .then(res => res.data.stats.activePlayers);
    }

    async function getPlayerBoxScore(playersBoxScore) {
        await playersBoxScore.forEach(player => {
            if (player.personId == playerData.personId){
          //      alert(player.points + " - " + player.personId)
                setCount(player);
                return;
            }
        });
    }

    const printStats = (playerStats) => {
        let string = 
        playerStats.firstName + " " + playerStats.lastName + "\n" +
        "OnCourt: " + playerStats.isOnCourt + "\n" +
        "Pts: " + playerStats.points + "\n" +
        "Reb: " + playerStats.totReb + "\n" +
        "Ast: " + playerStats.assists + "\n" +
        "FG: " + playerStats.fgm + "/" + playerStats.fga;
        if (latestString != string)
        {
            console.log(string)
            console.log("Min: " + playerStats.min + "\n")
            latestString = string
        }
        if (activate == false){
            clearInterval(interval)
        }
    }

    async function foo (){
        try{
            setCount(await getPlayers().then(res => getPlayerData(res,props.goal.value).then(res => getStatsOfPlayer(res))));
            setIsVisible(true);
        } catch{
            setHasStats(false)
        }
    }

    async function foo2 (){
        try{
        await
            getPlayers().then(res => getPlayerData(res,props.goal.value).then(res => getLiveGames(res).then(res =>
        getGameBoxScore(res[0].gameId.toString(),
        setHasLiveGame(true),
        )
    ).then(res => getPlayerBoxScore(res))));
    setIsVisible(true);
           } catch {
            //   setHasStats(false);
           }
     ///       setCount(await getPlayers().then(res => getPlayerData(res,props.goal.value).then(res => getStatsOfPlayer(res))));
    }

    async function foo3(){
        setCount(await getPlayers().then(res => getPlayerData(res,props.goal.value).then(getLiveGames())));
    }

        // let players;
        // lastName = props.goal.value;
        // getPlayers()
        // .then(res => getPlayerData(res,lastName)
        // .then(getLiveGames()
        // .then(res => 
        //     getGameBoxScore(res[0].gameId.toString(),
        //     activate = res.isGameActivated
        // )
        // .then(res => getPlayerBoxScore(res)
        // )
        // .then(res => printStats(playerBoxScore))
        //     )));
    if (hasStats == false)
    {
        return null;
    } else if (isVisible == false){
        return (
            <View style={[styles.listItem]}>
                <ActivityIndicator style={{color:'red'}} size="large" />
            </View>
        );
    } else if (hasLiveGame == false){
        return (
            <TouchableOpacity onPress={() => props.deleteGoal(props.goal.id)}>
                <View style={[styles.listItem,{backgroundColor:cardColor()}]}>
                    <View style={{flexDirection: 'row'}}>
                        <Text style={[styles.statText, {flex:'1', textAlignVertical: 'bottom' ,textAlign: 'center'}]}>{playerData.firstName}</Text>
                        <Text style={[styles.statText, {flex:'1', fontSize: 18}]}>{playerData.lastName}</Text>
                    </View>
                    {/* <View style={{flexDirection: 'row'}}>
                        <View>
                            <Text style={styles.statText}>{count.points}</Text>
                            <Text style={styles.statText}>{"Ppg"}</Text>
                        </View>
                        <View>
                            <Text style={styles.statText}>{count.totReb}</Text>
                            <Text style={styles.statText}>{"Rpg"}</Text>
                        </View>
                        <View>
                            <Text style={styles.statText}>{count.assists}</Text>
                            <Text style={styles.statText}>{"Apg"}</Text>
                        </View>
                    </View> */}
                </View>
            </TouchableOpacity>
        );
    } else {
        return (
            <TouchableOpacity onPress={() => props.deleteGoal(props.goal.id)}>
                <View style={[styles.listItem,{backgroundColor:cardColor()}]}>
                    <View style={{flexDirection: 'row'}}>
                        <Text style={[styles.statText, {flex:'1', textAlignVertical: 'bottom' ,textAlign: 'center'}]}>{playerData.firstName}</Text>
                        <Text style={[styles.statText, {flex:'1', fontSize: 18}]}>{playerData.lastName}</Text>
                    </View>
                    <View style={{flexDirection: 'row'}}>
                        <View>
                            <Text style={styles.statText}>{count.points}</Text>
                            <Text style={styles.statText}>{"Ppg"}</Text>
                        </View>
                        <View>
                            <Text style={styles.statText}>{count.totReb}</Text>
                            <Text style={styles.statText}>{"Rpg"}</Text>
                        </View>
                        <View>
                            <Text style={styles.statText}>{count.assists}</Text>
                            <Text style={styles.statText}>{"Apg"}</Text>
                        </View>
                    </View>
                </View>
            </TouchableOpacity>
        );
    }
}

export default ListItem;