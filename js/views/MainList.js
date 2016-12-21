/**
 * Copyright 2016 Facebook, Inc.
 *
 * You are hereby granted a non-exclusive, worldwide, royalty-free license to
 * use, copy, modify, and distribute this software in source code or binary
 * form for use in connection with the web services and APIs provided by
 * Facebook.
 *
 * As with any software that integrates with the Facebook platform, your use
 * of this software is subject to the Facebook Developer Principles and
 * Policies [http://developers.facebook.com/policy/]. This copyright notice
 * shall be included in all copies or substantial portions of the software.
 *
 * THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
 * IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
 * FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL
 * THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
 * LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING
 * FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER
 * DEALINGS IN THE SOFTWARE
 *
 * @flow
 */
'use strict';

var MainListCell = require('./MainListCell');
import  PureListView from '../common/PureListView';
import React,{Component} from 'react';
import {Navigator} from 'react-native';
import { connect } from 'react-redux';
import { getGameConfig} from '../actions';

type Props = {
  data: Array<any>;
  navigator: Navigator;
  renderEmptyList?: () => ReactElement;
};

class ReadingListView extends React.Component {
  props: Props;
  _innerRef: ?PureListView;

  constructor(props: Props) {
    super(props);
     this.state = {
      data:this.props.data,
    };
    this._innerRef = null;
    this.renderRow = this.renderRow.bind(this);
    this.renderEmptyList = this.renderEmptyList.bind(this);
    this.storeInnerRef = this.storeInnerRef.bind(this);
  }

  componentWillUpdate(nextProps, nextState) {
    // console.log('componentWillUpdate');
    // if (this.state.typeId !== nextState.typeId) {
    //   this.setState({
    //      typeId: nextState.typeId,
    //      articles:FilterArticles.byType(nextState.articles,nextState.typeId)
    //   });
    // }
  }


  render() {
    return (
      <PureListView
        ref={this.storeInnerRef}
        data={this.state.articles}
        renderRow={this.renderRow}
        {...this.props}
        renderEmptyList={this.renderEmptyList}
      />
    );
  }


  renderRow(article: any, typeId: number) {
    return (
      <MainListCell
        onPress={() => this.openSession(article, typeId)}
        session={article}
      />
    );
  }

  renderEmptyList(): ?ReactElement {
    const {renderEmptyList} = this.props;
    return renderEmptyList && renderEmptyList();
  }

  openSession(article: any, typeId: number) {
    this.props.getGameConfig(article,this.props.navigator);
  }

  storeInnerRef(ref: ?PureListView) {
    this._innerRef = ref;
  }

  scrollTo(...args: Array<any>) {
    this._innerRef && this._innerRef.scrollTo(...args);
  }

  getScrollResponder(): any {
    return this._innerRef && this._innerRef.getScrollResponder();
  }
}

function select(store) {
    return {
    };
}

function actions(dispatch) {
    return {
        getGameConfig: (gameId,navigator) => dispatch(getGameConfig(gameId,navigator)),
    };
}

module.exports = connect(select, actions)(ReadingListView);
