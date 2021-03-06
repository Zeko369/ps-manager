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
  Text,
  ListIcon
} from '@chakra-ui/core';
import { SubscriptionTypesQuery } from '../../../../generated';
import { LinkButton } from '../../../../components/Link';

interface IModalStuff {
  data: SubscriptionTypesQuery;
  isOpen: boolean;
  onClose: () => void;
  id: number;
}

const IndexModal: React.FC<IModalStuff> = ({ data, onClose, id, isOpen }) => {
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
              <Stack spacing={1}>
                <Text>
                  <b>Slug:</b> {subscriptionType.slug}
                </Text>
                <Text color={subscriptionType.amount !== 1 ? 'red.500' : undefined}>
                  <b>Multiplier:</b> {subscriptionType.amount}
                </Text>
                <Text>
                  <b>Items:</b>
                </Text>
                {subscriptionType.subscriptionItems.length ? (
                  <List>
                    {subscriptionType.subscriptionItems.map((si, index) => (
                      <ListItem key={si.id}>
                        <ListIcon icon="arrow-right" color="black" />
                        {si.name} #{index + 1}
                        <List>
                          {si.subscriptionItemProducts.map((sip) => (
                            <ListItem>
                              <ListIcon icon="chevron-right" color="black" />
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
              </Stack>
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

export default IndexModal;
