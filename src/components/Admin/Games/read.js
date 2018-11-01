import React, { Component } from 'react';
import api from '../../../config/api';
import Select from 'react-select';

class Read extends Component {
    state = {
        game: {
            title: '',
            developer: '',
            publisher: '',
            age_rate: '',
            summary: '',
            img_link: '',
            video_link: '',
            tags: [],
            platforms: []
        }
    }
    componentDidMount = () => {
        this.loadGame();
    }
    loadGame = () => {
        const id = this.props.match.params.id;        
        fetch(`${api.host}/games/${id}`)
        .then(res => res.json())
        .then(json => {
            if (json.status === 'success') {
                this.setState({
                    game: json.data
                })
            } else throw json.data;
        }).catch(console.error)
    }
    handleInput = (e) => {
        this.setState({
            game: {
                ...this.state.game,
                [e.target.name]: e.target.value
            }
        })
    }
    render() {
        const { title, developer, publisher, age_rate, summary, img_link, video_link, tags, platforms } = this.state.game;
        const select_style = {
            container: (base, state) => ({
                ...base,
                margin: '0 16px 16px 16px',
            }),
            valueContainer: (base, state) => ({
                ...base,
                padding: '6px',
            }),
            control: (base, state) => ({
                ...base,
                border: '1px solid rgba(0,0,0,0.1)',
                color: 'white',
                backgroundColor: 'rgba(0,0,0,0.2)',
            }),
            menu: (base, state) => ({
                ...base,
                border: '1px solid rgba(0,0,0,0.1)',
                color: 'white',
                backgroundColor: 'rgba(0,0,0,0.2)'
            }),
            multiValue: (base, state) => ({
                ...base,
                backgroundColor: 'rgba(0,0,0,0.2)',
            }),
            multiValueLabel: (base, state) => ({
                ...base,
                color: 'white'
            }),
            input: (base, state) => ({
                ...base,
                height: '28px'
            })
        }
        return (
            <section>
                <header>
                    게임 조회
                </header>
                <div className='list'>
                    <div className='index'>제목</div>
                    <input placeholder='제목을 입력해주세요' name='title' value={title} onChange={this.handleInput}></input>
                    <div className='index'>개발</div>
                    <input placeholder='개발사을 입력해주세요' name='developer' value={developer} onChange={this.handleInput}></input>
                    <div className='index'>배포</div>
                    <input placeholder='배포사을 입력해주세요' name='publisher' value={publisher} onChange={this.handleInput}></input>
                    <div className='index'>이용등급</div>
                    <input placeholder='이용등급을 입력해주세요' name='age_rate' value={age_rate} onChange={this.handleInput}></input>
                    <div className='index'>요약</div>
                    <textarea placeholder='요약을 입력해주세요' name='summary' value={summary} onChange={this.handleInput}></textarea>
                    <div className='index'>이미지 링크</div>
                    <input placeholder='이미지 링크를 입력해주세요' name='img_link' value={img_link} onChange={this.handleInput}></input>
                    <div className='index'>영상 링크</div>
                    <input placeholder='비디오 링크를 입력해주세요' name='video_link' value={video_link} onChange={this.handleInput}></input>
                    <div className='index'>태그</div>
                    <Select 
                        value={tags.map(tag => {return {label: tag, value: tag}})}
                        isClearable={true}
                        isMulti={true}
                        styles={select_style}
                    />
                    <div className='index'>플랫폼</div>
                    <Select 
                        value={platforms.map(platform => {return {label: platform, value: platform}})}
                        isClearable={true}
                        isMulti={true}
                        styles={select_style}
                    />
                </div>
            </section>
        )
    }
}
export default Read;