import React from 'react';
import { Button, Header, Modal, Grid } from 'semantic-ui-react';
import { Auth } from '../../Auth/auth';

const LoginModal = (props) => {
  const { isOpen, onClose } = props;
  const styles = {
    menustyle: {
      width: '30%',
      top: '15%',
    },
  };
  return (
    <Modal style={styles.menuStyle} open={isOpen} onClose={onClose}>
      <Header icon="sign-in" content="Don’t have an account?" />
      <Modal.Content>
        <Grid columns="equal">
          <Grid.Row>
            <Grid.Column>
              <Button circular color="facebook" icon="facebook" size="large" />
            </Grid.Column>

            <Grid.Column>
              <Button
                onClick={() => Auth.login()}
                circular
                icon="github"
                size="large"
              />
            </Grid.Column>

            <Grid.Column>
              <Button circular color="linkedin" icon="linkedin" size="large" />
            </Grid.Column>
            <Grid.Column>
              <Button circular icon="google plus" size="large" />
            </Grid.Column>
          </Grid.Row>
        </Grid>
      </Modal.Content>
      <Modal.Actions />
    </Modal>
  );
};

export default LoginModal;
