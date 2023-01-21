import { ChangeEvent, useEffect, useState } from 'react';
import { Grid, MenuItem, Select, SelectChangeEvent, TextField, Typography } from '@mui/material';
import { Box } from '@mui/system';
import UserResultCard from '../components/user-result-card';
import UserResult from '../models/UserResult';
import Repo from '../repositories'
import PannAppbar from '../components/pann-app-bar';

function UserResultList() {
    const [userResultList, setUserResultList] = useState<UserResult[]>([])
    const [selectFilter, setSelectFilter] = useState('')
    const [searchFilter, setSearchFilter] = useState('')

    const fetchUserResultList = async () => {
        let params: { keyword?: string, isPinned?: boolean } = {}
        if (searchFilter) {
            params.keyword = searchFilter
        }
        if (selectFilter) {
            params.isPinned = true
        }
        const result = await Repo.userResult.getAll(params)
        if (result) {
            if (userResultList.length) {
                setUserResultList([])
            }
            setUserResultList(result)
        } 
    }

    const handleChangeSelectFilter = (event: SelectChangeEvent) => {
        setSelectFilter(event.target.value)
    }

    const handleChangeSearchFilter = (event: ChangeEvent<HTMLInputElement>) => {
        setSearchFilter(event.target.value)
    }

    useEffect(() => {
        fetchUserResultList()
    }, [selectFilter, searchFilter])

    return (
        <Box sx={{ flexGrow: 1 }}>
            <PannAppbar></PannAppbar>
            <Select
            sx={{ m: 2, minWidth: 120 }}
            value={selectFilter}
            onChange={handleChangeSelectFilter}
            displayEmpty 
            >
                <MenuItem value=''>
                    All
                </MenuItem>
                <MenuItem value={1}>Pinned</MenuItem>
            </Select>
            <TextField sx={{ m:2, minWidth: 120 }} label="Search" variant='outlined' value={searchFilter} onChange={handleChangeSearchFilter} />
            {userResultList.length
              ?
              <Grid container spacing={{ xs: 2, md: 3 }} columns={{ xs: 2, sm: 8, md: 12, lg: 12, xl: 10}}>
                {userResultList.map((userResult, index) => 
                    <Grid item xs={2} sm={4} md={4} lg={3} xl={2} key={index}>
                        <UserResultCard userResult={userResult}></UserResultCard>
                    </Grid>
                )}
              </Grid>
              :
              <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center', minHeight: 400}}>
                <Typography variant='body2' color='text.secondary'>No Result Found</Typography>
              </Box>
            }
        </Box>
    )
}

export default UserResultList