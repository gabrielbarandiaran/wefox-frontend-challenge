import React from 'react';
import { Helmet } from 'react-helmet';
// Components
import DataTable from 'components/dataTable';


const Dashboard: React.FC = () => {
  return(
    <div className="section">
      <Helmet>
        <title>Sweet Spot | Dashboard</title>
      </Helmet>
      <div className="sectionContent">
        <DataTable />
      </div>
    </div>
  )
}

export default Dashboard;