import React, { Component } from 'react'
import { connect } from 'react-redux';
import { createBoard } from '../../store/actions/boardActions.js'

export class _AddBoard extends Component {

    state = {
        title: '',
        bgurl: '',
    }

    componentDidMount() {

    }

    handleChange = (ev) => {
        const value = ev.target.value
        const field = ev.target.name
        this.setState({ [field]: value })
    }

    onChooseBackground = (bgUrl) => {
        const callback = () => {
            this.onSubmit();
        };
        this.setState({ bgurl: bgUrl }, callback)
    }

    onSubmit = async () => {
        // ev.preventDefault()
        if (!this.state.title) return
        const board = await this.props.createBoard(this.state.title, this.state.bgurl)
        this.props.onLoadNewBoard(board._id)
    }

    onCancelAdd = (ev) => {
        ev.preventDefault()
        this.props.toggleNewBoard()
    }

    stopPropagation = (ev) => {
        ev.stopPropagation()
    }

    render() {
        const backgroundImages = [
            {
                id: 'bg101',
                bgurl: "https://cdn.pixabay.com/photo/2020/04/11/18/24/star-5031540_1280.jpg"
            },
            {
                id: 'bg102',
                bgurl: "https://cdn.pixabay.com/photo/2016/11/29/08/00/abstract-1868269_1280.jpg"
            },
            {
                id: 'bg103',
                bgurl: "https://cdn.pixabay.com/photo/2019/03/23/20/54/bamboo-4076262_1280.jpg"
            },
            {
                id: 'bg104',
                bgurl: "https://cdn.pixabay.com/photo/2013/07/21/13/00/rose-165819_1280.jpg"

            },
            {
                id: 'bg105',
                bgurl: "https://cdn.pixabay.com/photo/2014/09/14/18/04/dandelion-445228_1280.jpg"
            },
            {
                id: 'bg106',
                bgurl: "https://cdn.pixabay.com/photo/2017/05/11/11/15/workplace-2303851_1280.jpg"
            },
            {
                id: 'bg107',
                bgurl: "https://cdn.pixabay.com/photo/2016/02/19/11/33/backround-1209772_1280.jpg"
            },
            {
                id: 'bg108',
                bgurl: "https://cdn.pixabay.com/photo/2017/08/15/15/37/pen-2644392_1280.jpg"
            },
            {
                id: 'bg109',
                bgurl: "https://cdn.pixabay.com/photo/2018/01/11/21/27/laptop-3076957_1280.jpg"
            },
            {
                id: 'bg110',
                bgurl: "https://cdn.pixabay.com/photo/2018/05/31/13/13/rain-3443977_1280.jpg"
            },
            {
                id: 'bg111',
                bgurl: "https://cdn.pixabay.com/photo/2014/04/05/11/38/bokeh-316425_1280.jpg"
            },
            {
                id: 'bg112',
                bgurl: "https://cdn.pixabay.com/photo/2013/07/25/13/01/stones-167089_1280.jpg"
            }

        ]
        return (
            <div className="screen" onClick={this.onCancelAdd}>
                <div className="add-board" onSubmit={this.onSubmit} onClick={this.stopPropagation}>
                    <input placeholder="Enter a title for your new board..." type="text" onChange={this.handleChange} value={this.state.title} name="title" autoComplete="off" required />
                    <section className="add-board-backgrounds">
                        <h3>Enter a title, Choose a background - and get started!</h3>
                        {backgroundImages.map(background => {
                            return (
                                <div className="backgrounds-tumbs" key={background.id}
                                    style={{ backgroundImage: `url(${background.bgurl})` }}
                                    onClick={() => this.onChooseBackground(background.bgurl)}>
                                    <div className="plus">+</div>
                                </div>
                            )
                        })}
                    </section>
                    {/* <button className="save-btn">+ Add Board</button>
                    <button className="cancel-btn" onClick={this.onCancelAdd}>X Cancel</button> */}
                </div>
            </div>
        )
    }
}

const mapStateToProps = state => {
    return {

    };
};

const mapDispatchToProps = {
    createBoard

};

export const AddBoard = connect(mapStateToProps, mapDispatchToProps)(_AddBoard);