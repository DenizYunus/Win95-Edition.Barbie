/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/no-explicit-any */

import { useState } from 'react';
import { AppBar, Button, MenuList, MenuListItem, Separator, TextInput, Toolbar } from 'react95';
import logoIMG from '../assets/logo.png';

// const WindowWrapper = styled.div`
//   padding: 5rem;
//   background: ${({ theme }) => theme.desktopBackground};
// `;

const TaskBar = () => {
    const [open, setOpen] = useState(false);

    return (
        <AppBar position={"absolute"}>
            <Toolbar style={{ justifyContent: 'space-between', height: 36 }}>
                <div style={{ position: 'relative', display: 'inline-block' }}>
                    <Button
                        onClick={() => setOpen(!open)}
                        active={open}
                        style={{ fontWeight: 'bold' }}
                    >
                        <img
                            src={logoIMG}
                            alt='react95 logo'
                            style={{ height: '20px', marginRight: 4 }}
                        />
                        Start
                    </Button>
                    {open && (
                        <MenuList
                            style={{
                                position: 'absolute',
                                left: -5,
                                bottom: 44
                            }}
                            onClick={() => setOpen(false)}
                        >
                            <MenuListItem>
                                <span role='img' aria-label='👨‍💻'>
                                    👨‍💻
                                </span>
                                Profile
                            </MenuListItem>
                            <MenuListItem>
                                <span role='img' aria-label='📁'>
                                    📁
                                </span>
                                My account
                            </MenuListItem>
                            <Separator />
                            <MenuListItem disabled>
                                <span role='img' aria-label='🔙'>
                                    🔙
                                </span>
                                Logout
                            </MenuListItem>
                        </MenuList>
                    )}
                </div>
                <TextInput placeholder='Search...' width={150} />
            </Toolbar>
        </AppBar>
    );
};

export default TaskBar;
