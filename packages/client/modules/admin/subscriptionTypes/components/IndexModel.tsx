import React from 'react';
import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
  List,
  ListItem,
  Stack,
  Button,
  Text
} from '@chakra-ui/core';
import { SubscriptionTypesQuery } from '../../../../generated';
import { LinkButton } from '../../../../components/Link';

interface IModalStuff {
  data: SubscriptionTypesQuery;
  isOpen: boolean;
  onClose: () => void;
  id: number;
}

const IndexModel: React.FC<IModalStuff> = ({ data, onClose, id, isOpen }) => {
  const subscriptionType = data.subscriptionTypes.find((st) => st.id === id);

  return (
    <Modal isOpen={isOpen} onClose={onClose}>
      <ModalOverlay />
      <ModalContent>
        {subscriptionType ? (
          <>
            <ModalHeader>{subscriptionType.name}</ModalHeader>
            <ModalCloseButton />
            <ModalBody>
              <b>Slug:</b> {subscriptionType.slug}
              <br />
              <b>Items: </b>
              {subscriptionType.subscriptionItems.length ? (
                <List styleType="disc">
                  {subscriptionType.subscriptionItems.map((si, index) => (
                    <ListItem key={si.id}>
                      Box #{index + 1}
                      <List>
                        {si.subscriptionItemProducts.map((sip) => (
                          <ListItem>
                            {sip.product.name}
                            {sip.amount !== 1 && ` x ${sip.amount}`}
                          </ListItem>
                        ))}
                      </List>
                    </ListItem>
                  ))}
                </List>
              ) : (
                <Text>No items</Text>
              )}
            </ModalBody>

            <ModalFooter>
              <Stack isInline>
                <LinkButton
                  href="/admin/subscriptionTypes/[id]/edit"
                  as={`/admin/subscriptionTypes/${subscriptionType.id}/edit`}
                  variantColor="green"
                >
                  Edit
                </LinkButton>
                <Button variantColor="blue" mr={3} onClick={onClose}>
                  Close
                </Button>
              </Stack>
            </ModalFooter>
          </>
        ) : (
          <>
            <ModalHeader>Can't find subscription type</ModalHeader>
            <ModalCloseButton />
            <ModalBody>Missing :(</ModalBody>

            <ModalFooter>
              <Button variantColor="blue" mr={3} onClick={onClose}>
                Close
              </Button>
            </ModalFooter>
          </>
        )}
      </ModalContent>
    </Modal>
  );
};

export default IndexModel;
