import React from 'react'

import $ from 'jquery'

require('../../basescss/base.scss')

export default class LoadingComponent extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            loading: $('<div/>')
        }
    }
    //引用loading有两种方式：p_Common;LoadingComponent
    loadingStart() {
        this.loading.addClass('loading').appendTo($(document.body));
    }
    loadingEnd() {
        this.loading.removeClass('loading').remove();
    }
    render() {
        return (
            <div className="loading"></div>
        )
    }
}

