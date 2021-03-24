
import React, { Component } from 'react'
import { connect } from 'react-redux';
import { updateBoard } from '../../store/actions/boardActions.js'

export class _ChangeBoardBackground extends Component {

    state = {
        bgurl: '',
    }

    componentDidMount() {

    }

    onChooseBackground = (bgUrl) => {
        const callback = () => {
            this.onSubmit();
        };
        this.setState({ bgurl: bgUrl }, callback)
    }

    onSubmit = async () => {
        let boardToUpdate = JSON.parse(JSON.stringify(this.props.selectedBoard))
        boardToUpdate.style.bgurl = this.state.bgurl
        await this.props.updateBoard(boardToUpdate, 'changed background')
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
            <section className="side-menu-sub-item " onClick={this.stopPropagation}>
                <header>
                    <h3>Choose background</h3>
                    <button className="close-menu" onClick={this.props.toggleChangeBackground}>x</button>
                </header>
                <main className="add-board-backgrounds">
                    {backgroundImages.map(background => {
                        return (
                            <div className="backgrounds-tumbs" key={background.id}
                                style={{ backgroundImage: `url(${background.bgurl})` }}
                                onClick={() => this.onChooseBackground(background.bgurl)}>
                                <div className="plus">+</div>
                            </div>
                        )
                    })}
                </main>

            </section>

        )
    }
}

const mapStateToProps = state => {
    return {
        selectedBoard: state.boardModule.selectedBoard,
    };
};

const mapDispatchToProps = {
    updateBoard
};

export const ChangeBoardBackground = connect(mapStateToProps, mapDispatchToProps)(_ChangeBoardBackground);


