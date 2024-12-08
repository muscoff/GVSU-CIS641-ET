import React, { useState, useEffect } from 'react'

const generateBoard = val => {
    if(val === "") return {board: null, winningBoard: null}
    const board = []
    const winningBoard = []
    const firstDiagonal = []
    for(let i=0; i<val; i++) {
        let arr = []
        let sol = []
        for (let j=0; j<val; j++){
            arr.push("")
            sol.push([i, j])
        }
        firstDiagonal.push([i, i])
        board.push(arr)
        winningBoard.push(sol)
    }
    for(let m = 0; m < val; m++){
        let arr = []
        for(let n = 0; n < val; n++){
            arr.push([n, m])
        }
        winningBoard.push(arr)
    }
    const secondDiagonal = []
    let f1 = firstDiagonal.length - 1
    let f2 = 0
    firstDiagonal.forEach(item=>{
        secondDiagonal.push([f1, f2])
        f1--
        f2++
    })
    return {board, winningBoard: [...winningBoard, firstDiagonal, secondDiagonal] }
}

const getWinner = (index, board, pattern) => {
    if(!Array.isArray(index) || board.length === 0 || pattern.length === 0) return {status:false, winningPlayer: '', iscomplete: false}
    const [left, right] = index
    let status = false
    let player = board[left][right]
    const w_board = []
    pattern.forEach(item => {
        let s = item.some(el=>el[0] === left && el[1] === right)
        if(s) w_board.push(item)
    })

    for(let i = 0; i < w_board.length; i++){
        let s = w_board[i].every(el=>board[el[0]][el[1]] === player)
        if (s) {
            status = true
            break
        }
    }
    let is_comp_arr = []
    board.forEach(item=> is_comp_arr = is_comp_arr.concat(item))
    const iscomplete = is_comp_arr.includes("")
    return {status, winningPlayer: player, iscomplete: !iscomplete}
}

export default function TicTacToe() {
    const [sel, setSel] = useState(3)
    const [t_board, setBoard] = useState([])
    const [winningPattern, setWinningPattern] = useState([])
    const [showSel, setShowSel] = useState(false)
    const [player, setPlayer] = useState("X")
    const [index, setIndex] = useState(null)
    const onChange = e => {
        if(e.target.value === "") return
        setSel(Number(e.target.value))
        setShowSel(true)
    }

    const selectBox = (left, right) => {
        if(t_board[left][right]!== "") return
        t_board[left][right] = player
        setPlayer(player === "X" ? "O" : "X")
        setIndex([left, right])
    }

    const tictacBoard = t_board.length > 0 ? t_board.map((item, i)=>(
        <div style={{width: `${25*t_board.length}px`}} className="flex-row" key={i}>
            {
                item.map((el, ind)=>(
                    <div 
                        style={{
                            width: `${25}px`, 
                            height: `${25}px`,
                            border: `${1}px solid #000`
                        }}
                        onClick={()=>selectBox(i, ind)}
                        key={ind}
                    >{el}</div>
                ))
            }
        </div>
    )) : <></>

    useEffect(()=>{
        const {board, winningBoard} = generateBoard(sel)
        setBoard(board)
        setWinningPattern(winningBoard)
    }, [sel])

    const makeAnnoucement = iscomplete => {
        if(iscomplete) {
            alert("It's a draw!")
            window.location.reload()
        }
    }

    useEffect(()=>{
        setTimeout(()=>{
            const {status, winningPlayer, iscomplete} = getWinner(index, t_board, winningPattern)
            if(status) {
                alert(`Player: ${winningPlayer} won!`)
                window.location.reload()
            }else{
                makeAnnoucement(iscomplete)
            }
        },100)
    }, [index])
  return (
    <>
    {
        !showSel && (
            <select value={sel} onChange={onChange}>
                <option value="">Select Matrix size</option>
                {
                    [3,4,5,6,7,8,9,10].map((item, i)=>(
                        <option key={i} value={item}>{item}</option>
                    ))
                }
            </select>
        )
    }
    <div>TicTacToe</div>
    <br />
    <>{tictacBoard}</>
    </>
  )
}
