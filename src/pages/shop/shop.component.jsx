import React from 'react';
import { Route } from 'react-router-dom';
import { connect } from 'react-redux';

import {fetchCollectionsStart} from '../../redux/shop/shop.actions';

import CollectionOverviewContainer from '../../components/collections-overview/collection-overview.container';
import CollectionPageContainer from '../collection/collection.contaianer';

class ShopPage extends React.Component {
  unsbscribeFromSnapshot = null;

  componentDidMount() {
    const { fetchCollectionsStart } = this.props;
    fetchCollectionsStart(); 
  }

  render() {
    const { match } = this.props;
    return (
      <div className='shop-page'>
        <Route exact path={`${match.path}`} component = {CollectionOverviewContainer} />
        <Route path={`${match.path}/:collectionId`} component={CollectionPageContainer}/>
      </div>
    )
  }
};


const mapDispatchToProps = (dispathc) => ({
  fetchCollectionsStart: () => dispathc(fetchCollectionsStart())
});

export default connect(null, mapDispatchToProps)(ShopPage);