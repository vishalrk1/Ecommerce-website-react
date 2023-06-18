import React, { useEffect } from 'react';
import { Route } from 'react-router-dom';
import { connect } from 'react-redux';

import {fetchCollectionsStart} from '../../redux/shop/shop.actions';

import CollectionOverviewContainer from '../../components/collections-overview/collection-overview.container';
import CollectionPageContainer from '../collection/collection.contaianer';

const ShopPage = ({ fetchCollectionsStart, match }) => {

  useEffect(() => {
    fetchCollectionsStart();
  }, [fetchCollectionsStart])

    return (
      <div className='shop-page'>
        <Route exact path={`${match.path}`} component = {CollectionOverviewContainer} />
        <Route path={`${match.path}/:collectionId`} component={CollectionPageContainer}/>
      </div>
    )
  };


const mapDispatchToProps = (dispathc) => ({
  fetchCollectionsStart: () => dispathc(fetchCollectionsStart())
});

export default connect(null, mapDispatchToProps)(ShopPage);