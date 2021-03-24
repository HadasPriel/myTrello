import React, { Component } from 'react'
import { connect } from 'react-redux'

// import { socketService } from '../services/socketService'

class _AddCoverBar extends Component {
    state = {
    }

    componentDidMount() {
    }


    handleStyle = async (ev) => {
        const cardToSave = { ...this.props.card }
        cardToSave.style = (cardToSave.style) ? { ...cardToSave.style, [ev.target.name]: ev.target.value } : { [ev.target.name]: ev.target.value }
        await this.props.updateCard(cardToSave)
    }

    removeCover = async (ev) => {
        ev.preventDefault()
        const cardToSave = { ...this.props.card }
        cardToSave.style = { coverType: 'top' }
        await this.props.updateCard(cardToSave)
    }



    render() {

        return (
            <div className="add-cover-bar edit-bar">
                <header className="seconde">
                    <h3>cover</h3>
                    <button onClick={this.props.toggleCoverBar}>x</button>
                </header>
                <button onClick={this.removeCover} className="edit-btn remove">Remove Cover </button>
                <h5>size</h5>
                <main>
                    <label className="inline-block">
                        <div className="full demo window">
                            <div className="demo header"></div>
                            <div className="demo content">
                                <div className="demo p1"></div>
                                <div className="demo p2"></div>
                            </div>
                        </div>
                        <input type="radio" name="coverType" value="full" onClick={this.handleStyle} ></input>
                    </label>
                    <label className="inline-block" >
                        <div className="top demo window">
                            <div className="demo header"></div>
                            <div className="demo content">
                                <div className="demo p1"></div>
                                <div className="demo p2"></div>
                            </div>
                        </div>
                        <input type="radio" name="coverType" value="top" onClick={this.handleStyle}></input>
                    </label>
                </main>
                <h5>colors</h5>
                <main>
                    <nav className="colors">
                        <label className="color #7bc86c">
                            <input type="radio" name="bgColor" value="#7bc86c" onClick={this.handleStyle}></input>
                        </label>
                        <label className="color #f5dd29">
                            <input type="radio" name="bgColor" value="#f5dd29" onClick={this.handleStyle}></input>
                        </label>
                        <label className="color #ffaf3f">
                            <input type="radio" name="bgColor" value="#ffaf3f" onClick={this.handleStyle}></input>
                        </label>
                        <label className="color #ef7564">
                            <input type="radio" name="bgColor" value="#ef7564" onClick={this.handleStyle}></input>
                        </label>
                        <label className="color #cd8de5">
                            <input type="radio" name="bgColor" value="#cd8de5" onClick={this.handleStyle}></input>
                        </label>
                        <label className="color #5ba4cf">
                            <input type="radio" name="bgColor" value="#5ba4cf" onClick={this.handleStyle}></input>
                        </label>
                        <label className="color #29cce5">
                            <input type="radio" name="bgColor" value="#29cce5" onClick={this.handleStyle}></input>
                        </label>
                        <label className="color #6deca9">
                            <input type="radio" name="bgColor" value="#6deca9" onClick={this.handleStyle}></input>
                        </label>
                        <label className="color #ff8ed4">
                            <input type="radio" name="bgColor" value="#ff8ed4" onClick={this.handleStyle}></input>
                        </label>
                        <label className="color #172b4d">
                            <input type="radio" name="bgColor" value="#172b4d" onClick={this.handleStyle}></input>
                        </label>
                    </nav>
                </main>
            </div>

        )
    }
}

const mapStateToProps = state => {
    return {
    }
}
const mapDispatchToProps = {
}

export const AddCoverBar = connect(mapStateToProps, mapDispatchToProps)(_AddCoverBar)
