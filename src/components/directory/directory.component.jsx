import React from "react";
import { connect } from "react-redux";
import { createStructuredSelector } from "reselect";

import MenuItem from "../menu-item/menu-item.component";
import { selectDirectorySections } from "../../redux/directory/directory.selector";

const Directory = ({ sections }) => {
  return (
    <div className="directory-menu">
      {
        sections.map(({title, id, imageUrl, size, linkUrl}) => (
          <MenuItem key={id} title={title} imageUrl={imageUrl} size={size} linkUrl={linkUrl}/>
        ))
      }
    </div>
  );
}

const mapStatesToProp = state => createStructuredSelector({
  sections: selectDirectorySections
})

export default connect(mapStatesToProp)(Directory);