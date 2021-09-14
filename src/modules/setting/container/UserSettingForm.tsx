import React, { useState, useRef } from 'react';
import Box from '@material-ui/core/Box';
import styled from 'styled-components';
import Button from '@material-ui/core/Button';
import CameraAltIcon from '@material-ui/icons/CameraAlt';
import ArrowRightAltIcon from '@material-ui/icons/ArrowRightAlt';
import { userSelector } from 'src/redux/reducers/Auth';
import { useDispatch, useSelector } from 'react-redux';
import axios from 'axios';
import CircularProgress from '@material-ui/core/CircularProgress';
import { changeAvatar } from '../../../redux/actions/JWTAuth';

const StyledButton = styled(Button)`
  margin-top: 20px;
`;

const StyledInfo = styled(Box)`
  font-size: 17px;
  margin-bottom: 20px;
  font-weight: 600;
  margin-top: 5px;
`;
interface UserSettingFormProps {
  handleEditBank: () => void;
  handleEditPassword: () => void;
}

const UserSettingForm = ({ handleEditBank, handleEditPassword }: UserSettingFormProps) => {
  const dispatch = useDispatch();
  const user = useSelector(userSelector);
  const refInput = useRef<HTMLInputElement>(null);
  const [avatar, setAvatar] = useState<File>();
  const [loading, setLoading] = useState(false);
  const handleChangeAvatar = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      const image = e.target.files[0];
      setAvatar(image);
    }
  };
  const submitAvatar = () => {
    setLoading(true);
    const formData = new FormData();
    formData.append('file', avatar as any);
    formData.append('upload_preset', 'krystal');
    axios
      .post('https://api.cloudinary.com/v1_1/dofjvpahx/image/upload', formData, {
        headers: { 'X-Requested-With': 'XMLHttpRequest' },
      })
      .then((response) => {
        const { data } = response;
        const url = data.secure_url; // You should store this URL for future references in your app
        dispatch(changeAvatar({ username: user?.displayName ?? '', url }));
        setLoading(false);
      })
      .catch((error) => {
        console.log(error);
        setLoading(false);
      });
  };
  return (
    <Box
      bgcolor="#fff"
      borderRadius="8px"
      p="20px"
      flexDirection="column"
      display="flex"
      width="100%"
      boxShadow="0px 2x rgba(163, 171, 185, 0.24)"
    >
      <Box display="flex" justifyContent="center" alignItems="center" flexDirection="column">
        <input
          type="file"
          ref={refInput}
          style={{ display: 'none' }}
          onChange={handleChangeAvatar}
          accept=".jpg, .jpeg, .png, .svg"
        />
        <Box
          width="105px"
          height="105px"
          display="flex"
          justifyContent="center"
          alignItems="center"
          position="relative"
          borderRadius="50%"
          border="1px solid gray"
        >
          <img
            src={avatar ? URL.createObjectURL(avatar) : user?.photoURL}
            alt="avatar"
            style={{ borderRadius: '50%' }}
          />
          <Box
            display="flex"
            justifyContent="center"
            alignItems="center"
            width="24px"
            height="24px"
            style={{
              position: 'absolute',
              bottom: '5px',
              right: '5px',
              cursor: 'pointer',
            }}
            bgcolor="#fff"
            borderRadius="50%"
            p="3px"
            onClick={() => refInput.current?.click()}
          >
            <CameraAltIcon style={{ fontSize: '20px' }} />
          </Box>
        </Box>
        <Box fontWeight="bold" mb="5px" mt="10px" fontSize="16px">
          {user?.reseller}
        </Box>
        <Box color="#90A0B7" fontSize="14px">
          Cộng tác viên
        </Box>
      </Box>
      <Box
        onClick={handleEditBank}
        mb="20px"
        mt="20px"
        borderLeft="2px solid #34AC6D"
        bgcolor="#fff"
        display="flex"
        py="10px"
        px="20px"
        alignItems="center"
        justifyContent="space-between"
        borderBottom="1px solid #F5F6F8"
        borderTop="1px solid #F5F6F8"
      >
        <Box display="flex" alignItems="center" justifyContent="space-between">
          <img src="/assets/images/dasboard/cardnew.svg" alt="card" />
          <Box ml="20px">
            <Box color="#90A0B7">Tài khoản</Box>
            <Box fontWeight="bold">
              {`*****${
                user?.bankAccountNumber
                  ? user?.bankAccountNumber.substring(
                      user?.bankAccountNumber.length - 4,
                      user?.bankAccountNumber.length,
                    )
                  : '****'
              }`}
            </Box>
          </Box>
        </Box>

        <ArrowRightAltIcon />
      </Box>
      <Box
        onClick={handleEditPassword}
        mb="20px"
        borderLeft="2px solid #109CF1"
        bgcolor="#fff"
        display="flex"
        py="10px"
        px="20px"
        alignItems="center"
        justifyContent="space-between"
        borderBottom="1px solid #F5F6F8"
        borderTop="1px solid #F5F6F8"
      >
        <Box display="flex" alignItems="center" justifyContent="space-between">
          <img src="/assets/images/dasboard/lock.svg" alt="card" />
          <Box ml="20px">
            <Box color="#90A0B7">Mật khẩu</Box>
            <Box fontWeight="bold">*********</Box>
          </Box>
        </Box>

        <ArrowRightAltIcon />
      </Box>

      <Box color="#90A0B7">Số điện thoại</Box>
      <StyledInfo>{user?.phone}</StyledInfo>
      <Box color="#90A0B7">Email</Box>
      <StyledInfo>{user?.email}</StyledInfo>
      <Button variant="outlined" color="primary" style={{ marginTop: '30px' }}>
        Chính sách cộng tác viên
      </Button>
      <StyledButton variant="contained" color="primary" onClick={submitAvatar} fullWidth>
        {loading ? <CircularProgress size={30} color="inherit" /> : ' Cập nhật'}
      </StyledButton>
    </Box>
  );
};

export default UserSettingForm;
