import React, {useState, useEffect} from 'react'
// Redux
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux'
import { ThunkDispatch } from 'redux-thunk';
import { startSetPosts, startSetPost } from 'redux/actions/post'
import { startSetAppInterface } from 'redux/actions/application'
import { AppState } from 'redux/store/configureStore';
import { AppActions } from 'redux/types/actions';
import { Post } from 'redux/types/Post';
// Material-UI
import Paper from '@material-ui/core/Paper';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TablePagination from '@material-ui/core/TablePagination';
import TableRow from '@material-ui/core/TableRow';

interface DataTableProps {
  posts?: Post[]
}

type Props = DataTableProps & LinkDispatchProps & LinkStateProps;


interface Column {
  id: 'title' | 'lat' | 'long';
  label: string;
  minWidth?: number;
  align?: 'right';
}

const columns: Column[] = [
  { 
    id: 'title', 
    label: 'Title', 
    minWidth: 170 
  },
  { 
    id: 'lat', 
    label: 'Latitude', 
    minWidth: 100,
    align: 'right'
  },
  {
    id: 'long',
    label: 'Longitude',
    minWidth: 100,
    align: 'right'
  }
];

const DataTable: React.FC<Props> = (props) => {
  useEffect(() => {
    props.startSetPosts();
  }, []);
  
  const {posts} = props;
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(5);
  
  const handleChangePage = (event: unknown, newPage: number) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event: React.ChangeEvent<HTMLInputElement>) => {
    setRowsPerPage(+event.target.value);
    setPage(0);
  };

  const handleRowClick = (id?: number) => {
    props.startSetAppInterface("postDetail");
    if (id !== undefined) {
      props.startSetPost(id);
    }
  }

  return(
    <div className="dataTableBody">
      <Paper>
        <TableContainer>
          <Table stickyHeader>
            <TableHead>
              <TableRow>
                {columns.map((column) => (
                  <TableCell
                    key={column.id}
                    align={column.align}
                    style={{ minWidth: column.minWidth }}
                  >
                    {column.label}
                  </TableCell>
                ))}
              </TableRow>
            </TableHead>
            <TableBody>
              {posts.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage).map((post) => {
                return (
                  <TableRow 
                    onClick={() => handleRowClick(post.id)} 
                    hover 
                    role="checkbox" 
                    tabIndex={-1} 
                    key={post.id}>
                    {columns.map((column) => {
                      const value = post[column.id];
                      return (
                        <TableCell key={column.id} align={column.align}>
                          {value}
                        </TableCell>
                      );
                    })}
                  </TableRow>
                );
              })}
            </TableBody>
          </Table>
        </TableContainer>
        <TablePagination
          rowsPerPageOptions={[5, 10, 25]}
          component="div"
          count={posts.length}
          rowsPerPage={rowsPerPage}
          page={page}
          onChangePage={handleChangePage}
          onChangeRowsPerPage={handleChangeRowsPerPage}
        />
      </Paper>
    </div>
  )
}

interface LinkStateProps {
  posts: Post[]
 }
 
 interface LinkDispatchProps {
   startSetPosts: () => void;
   startSetPost: (id: number) => void;
   startSetAppInterface: (activeInterface: "dashboard" | "postDetail" | "addPost") => void;
 }
 
 const mapStateToProps = (state: AppState, props: DataTableProps): LinkStateProps => ({
   posts: state.posts.posts
 });
 
 const mapDispatchToProps = (dispatch: ThunkDispatch<any, any, AppActions>, props: DataTableProps): LinkDispatchProps => ({
   startSetPosts: bindActionCreators(startSetPosts, dispatch),
   startSetPost: bindActionCreators(startSetPost, dispatch),
   startSetAppInterface: bindActionCreators(startSetAppInterface, dispatch)
 });
 
 export default connect(mapStateToProps, mapDispatchToProps)(DataTable);