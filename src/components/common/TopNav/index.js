import Link from 'next/link';
import React, { memo } from 'react';
import { Container, Dropdown, Menu } from 'semantic-ui-react';

const TopNav = () => {
  return (
    <Container className="topnavWrapper" fluid>
      <Menu className="topnav" inverted>
        <Menu.Menu className="menuLogo" position="left">
          <Menu.Item>
            <Link href={{ pathname: '/' }}>
              <a>Home</a>
            </Link>
          </Menu.Item>
        </Menu.Menu>

        <Container className="topbar">
          <Menu.Menu position="left">
            <Dropdown item simple text="Dev">
              <Dropdown.Menu>
                <Dropdown.Item content="Step #1" href="/step-one" />
                <Dropdown.Item content="Step #2" href="/step-two" />
                <Dropdown.Divider />
                <Dropdown.Item content="home" href="/" />
                <Dropdown.Item content="about" href="/about" />
                <Dropdown.Item content="actors" href="/actors" />
                <Dropdown.Item content="algolia" href="/algolia" />
                <Dropdown.Item content="async" href="/async" />
                <Dropdown.Item content="ifail" href="/ifail" />
                <Dropdown.Item content="segment" href="/segment" />
              </Dropdown.Menu>
            </Dropdown>
          </Menu.Menu>
          <Menu.Menu position="right">
            <Menu.Item className="instantsearch">Search</Menu.Item>
            <Link href={{ pathname: '/account/profile' }}>
              <Menu.Item className="menuItemOnly" link name="My Profile" />
            </Link>
          </Menu.Menu>
        </Container>
      </Menu>
    </Container>
  );
};

export default memo(TopNav);
