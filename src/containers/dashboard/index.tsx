import React from 'react'
// Components
import DataTable from 'components/dataTable'


export const Dashboard: React.FC = () => {
  return(
    <div className="section">
      <div className="sectionContent">
        <DataTable />
      </div>
    </div>
  )
}