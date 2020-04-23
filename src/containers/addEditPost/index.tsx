import React from 'react';
// Components
import AddEditPostForm from 'components/addEditPostForm';

const AddEditPost: React.FC = () => {
  return(
    <div className="section">
      <div className="sectionContent">
        <AddEditPostForm />
      </div>
    </div>
  )
}

export default AddEditPost;