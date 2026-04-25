import { ListItemIcon, MenuItem } from '@mui/material'
import DeleteIcon from '@mui/icons-material/Delete';

const DeleteAction = ({ handleDelete, row, deleteType }) => {
    return (
        <MenuItem key='delete' onClick={()=>handleDelete([row.original_id], deleteType)}>
            <ListItemIcon>
                <DeleteIcon />
            </ListItemIcon>
            Delete
        </MenuItem>
    )
}

export default DeleteAction
